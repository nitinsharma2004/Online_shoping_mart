const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
const Product = require("../models/productSchema");
var bcrypt = require("bcryptjs");
const multer = require('multer');
const path = require('path');
const authenticate = require("../middleware/authenticate");
const PaymentModel = require("../models/oflinepayschema");
const PayModel = require("../models/onlinepayschema");
const orderdb = require("../models/ordershema");
const mongoose = require('mongoose');
// for user registration

router.post("/register", async (req, res) => {

    const { fname, email, password, cpassword,userType } = req.body;

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        const preuser = await userdb.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        } else {
            const finalUser = new userdb({
                fname, email, password, cpassword,userType
            });

            const storeData = await finalUser.save();

            res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }

});




// user Login

router.post("/login", async (req, res) => {
    const { email, password,user} = req.body;
    if (!email || !password||!user) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
        const userValid = await userdb.findOne({email:email});
        let usertype;
        if(userValid){
            if(userValid.userType === user){
                  usertype = userValid.userType;
            }else{
                res.status(401).json({ error: "invalid user type"});
            }
        }
        
        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);
            if(!isMatch){
                res.status(401).json({ error: "invalid details"})
            }else{
                const token = await userValid.generateAuthtoken();
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+2628002880),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token,
                    usertype,
                }
                res.status(201).json({status:201,result})
            }
        
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("email or password not exist");
    }
});


// user valid
router.get("/abc",authenticate,async(req,res)=>{
    res.send(req.rootUser);
});


// user logout

router.get("/logout", authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token;
        });
        res.clearCookie("usercookie");

         await req.rootUser.save(); 

        
        res.status(201).json({ status: 201 });
    } catch (error) {
        
        console.error('Error during logout:', error);
        res.status(401).json({ status: 401, error: 'Logout failed' });
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images'); 
    },
    filename: function (req, file, cb) {
      cb(null,`${ Date.now()}_${file.originalname}`); 
    },
  });
  
  const upload = multer({ storage });

  

  router.post('/api/products', upload.single('image'), async (req, res) => {
    try {

        const imagePath = req.file.path.replace(/\\/g, '/');
        const newProduct = new Product({
            ...req.body,
            image: imagePath,
        });

        const savedProduct = await newProduct.save();

        console.log('Product saved successfully');

        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: error.message, stack: error.stack });
    }
});

router.get('/api/products', async (req, res) => {
    try {
      const { id } = req.query;
  
      if (id) {
        const product = await Product.findOne({ id });
  
        if (!product) {
          res.status(404).json({ error: 'Product not found' });
          return;
        }

        res.json([product]);
      } else {
        const products = await Product.find();
        res.json(products);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
//  manage product admin
///delete card
  router.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
  
    try {
      const result = await Product.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ error: `Product with ID ${id} not found` });
      }
  
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // update card
  router.put('/api/products/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
  
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
  
    try {
      const updateData = req.body;
      if (req.file) {
        updateData.image = req.file.path;
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ error: `Product with ID ${id} not found` });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
  });
  

// get that card on server
router.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const product = await Product.findById(id); 

    if (!product) {
      return res.status(404).json({ error: `Product with ID ${id} not found` });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
});

  

  router.post('/api/offline-payment', async (req, res) => {
    try {
      const { offlinePaymentDetails, cart } = req.body;
  
      const newPayment = new PaymentModel({
        ...offlinePaymentDetails,
        items: cart,
      });
  
      await newPayment.save();
  
      res.json({ success: true, message: 'Payment details saved successfully.' });
    } catch (error) {
      console.error('Error saving payment details:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  
  router.post('/api/online-payment', async (req, res) => {
    try {
      const { debitCardDetails,creditCardDetails,cart } = req.body;
      const newPayment = new PayModel({
        ...debitCardDetails,
        ...creditCardDetails,
        items: cart,
      });
  
      await newPayment.save();
  
      res.json({ success: true, message: 'Payment details saved successfully.' });
    } catch (error) {
      console.error('Error saving payment details:', error);
      res.status(401).json({ success: false, message: 'Internal server error' });
    }
  });

  router.get('/api/online-payments', async (req, res) => {
    try {
      const onlinePayments = await PayModel.find();
      res.json(onlinePayments);
    } catch (error) {
      console.error('Error fetching offline payments:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  router.get('/api/online-payments/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const onlinePayment = await PayModel.findById(id);
  
      if (!onlinePayment) {
        return res.status(404).json({ success: false, message: 'Payment not found' });
      }
  
      res.json(onlinePayment);
    } catch (error) {
      console.error('Error fetching online payment by ID:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  
  router.delete('/api/online-payments/:productId', async (req, res) => {
    const productId = req.params.productId;
   console.log(productId);
    try {
      const existingPayment = await PayModel.findById(productId);
  
      if (!existingPayment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
  
      await existingPayment.remove();
  
      return res.status(200).json({ message: 'Deletion successful' });
    } catch (error) {
      console.error('Error deleting payment:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

router.get('/api/offline-payments', async (req, res) => {
  try {
    const offlinePayments = await PaymentModel.find();
    res.json(offlinePayments);
  } catch (error) {
    console.error('Error fetching offline payments:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/api/offline-payments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const offlinePayment = await PaymentModel.findById(id);

    if (!offlinePayment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    res.json(offlinePayment);
  } catch (error) {
    console.error('Error fetching offline payment by ID:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});  
router.delete('/api/offline-payments/:productId', async (req, res) => {
  const productId = req.params.productId;
 console.log(productId);
  try {
    const existingPayment = await PaymentModel.findById(productId);

    if (!existingPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    await existingPayment.remove();

    return res.status(200).json({ message: 'Deletion successful' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
  router.get('/api/online-payments', async (req, res) => {
    try {
      const onlinePayments = await PayModel.find();
      res.json({ success: true, data: onlinePayments });
    } catch (error) {
      console.error('Error fetching online payments:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  router.post('/admin/order_detail',async(req,res)=>{
    try{
      const {sdate,ddate,product} = req.body;
      const newdetail = new orderdb(
        {sdate,ddate,product}
      );
      await newdetail.save();
      res.json({ success: true, message: 'Payment details saved successfully.' });
    } catch (error) {
      console.error('Error saving payment details:', error);
      res.status(401).json({ success: false, message: 'Internal server error' });
    }
  });
  router.get('/admin/order_detail',async(req,res)=>{
    try {
      const orderdetail = await orderdb.find();
      res.json(orderdetail);
    } catch (error) {
      console.error('Error fetching orders history:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  router.get('/admin/order_detail/:orderId',async(req,res)=>{
    const orderId = req.params.orderId;
    try {
      const orderdetail = await orderdb.findById(orderId);
  
      if (!orderdetail) {
        return res.status(404).json({ success: false, message: 'order not found' });
      }
  
      res.json(orderdetail);
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  router.delete('/admin/order_detail/:orderId',async (req, res) => {
    const orderId = req.params.orderId;
  console.log(orderId);
    try {
      const existingOrder = await orderdb.findById(orderId);
  
      if (!existingOrder) {
        return res.status(404).json({ error: 'order not found' });
      }
  
      await existingOrder.remove();
  
      return res.status(200).json({ message: 'Deletion successful' });
    } catch (error) {
      console.error('Error deleting order:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
module.exports = router;



