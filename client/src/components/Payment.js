import React, { useState,useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCartContext } from '../context/cart_context';
import FormatPrice from '../Helpers/FormatPrice';
const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  font-size: 16px;
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 16px;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  font-size: 18px;
  padding: 12px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const PaymentForm = styled.form`
  width: 450px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .donation-amount {
    margin-bottom: 10px;
  }

  .name {
    margin-bottom: 10px;
  }

  .email {
    margin-bottom: 10px;
  }

  .billing-address {
    margin-bottom: 10px;
  }

  .card-number {
    margin-bottom: 10px;
  }
  .Mobile-Number {
    margin-bottom: 10px;
  }
  .Pin {
    margin-bottom: 10px;
  }
  .Order-Date {
    margin-bottom: 10px;
  }
  .expiration-date {
    margin-bottom: 10px;
  }

  .cvc {
    margin-bottom: 10px;
  }

  button {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #000;
    cursor: pointer;
  }
`;


const Payment = () => {
  const history = useNavigate();

  const callhome = async () => {
    try {
      const res = await fetch('/abc', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      if (res.status === 401) {
        const error = new Error(data.error);
        throw error;
      }
    } catch (e) {
      console.log("abc");
      history('/login');
    }
  }
  useEffect(() => {
    callhome();
  }, []);

  const { cart, total_price,shipping_fee,clearCart } = useCartContext();
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState('offline');
  const [offlinePaymentDetails, setOfflinePaymentDetails] = useState({
    uname:'',
    address: '',
    city: '',
    location:'',
    pin: '',
    mnumber:'',
    odate:'',
    total:total_price+shipping_fee,
    usertype:'offline',
  });
  const [onlinePaymentMethod, setOnlinePaymentMethod] = useState('');
  const [onlinePaymentOptions] = useState(['Credit Card', 'Debit Card']);

  const [creditCardDetails, setCreditCardDetails] = useState({
    damount:'',
    uname:'',
    uemail:'',
    baddress:'',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    mnumber:'',
    upin:'',
    odate:'',
    total:total_price+shipping_fee,
    usertype:'online',
  });

  const [debitCardDetails, setDebitCardDetails] = useState({
    damount:'',
    uname:'',
    uemail:'',
    baddress:'',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    mnumber:'',
    upin:'',
    odate:'',
    total:total_price+shipping_fee,
    usertype:'online',

  });

  

  const handleInputChange = (e, category) => {
    const { name, value } = e.target;
    if (category === 'offline') {
      setOfflinePaymentDetails({ ...offlinePaymentDetails, [name]: value });
    } else if (category === 'online') {
      setOnlinePaymentMethod(value);
    }
  };

  const handleOnlinePaymentDetailsChange = (e, method) => {
    const { name, value } = e.target;

    if (method === 'creditCard') {
      setCreditCardDetails({ ...creditCardDetails, [name]: value });
    } else if (method === 'debitCard') {
      setDebitCardDetails({ ...debitCardDetails, [name]: value });
    } 
  };

  const handlePayment = async (e) => {
  
  
    try {
      if (paymentType === 'offline') {
        const res = await axios.post('http://localhost:8009/api/offline-payment', {offlinePaymentDetails,cart});
        if(res.status === 401 || !res){
          toast.warning("Error Occured 😃!", {
              position: "top-center"
          });
        }
        else{
        toast.success("Done 😃!", {
          position: "top-center",
          autoClose: 2000,
      });
      clearCart();
      navigate("/delivery") ;
    }
      } else if (paymentType === 'online') {
        if (onlinePaymentMethod === 'Credit Card') {
          const res = await axios.post('http://localhost:8009/api/online-payment', {creditCardDetails,cart });
          if(res.status === 401 || !res){
            toast.warning("Error Occured 😃!", {
                position: "top-center"
            });
          }
        else{
        toast.success("Done 😃!", {
          position: "top-center",
          autoClose: 2000,
      });
      clearCart();
      navigate("/delivery") ;
    }
        }else if (onlinePaymentMethod === 'Debit Card') {
          const res = await axios.post('http://localhost:8009/api/online-payment', {debitCardDetails,cart });
          if(res.status === 401 || !res){
            toast.warning("Error Occured 😃!", {
                position: "top-center"
            });
          }
        else{
        toast.success("Done 😃!", {
          position: "top-center",
          autoClose: 2000,
      });
      clearCart();
      navigate("/delivery") ;
    }
        }
    }
   } catch (error) {
      console.error('Error during payment:', error);
    }
  
  };

  return (
    <Container>
      <Header>Payment Details</Header>
      <FormContainer>
        <Label>
          Payment Type:
          <Select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
            <option value="offline">Offline Payment</option>
            <option value="online">Online Payment</option>
          </Select>
        </Label>
        {paymentType === 'offline' && (
          <div>
            <Header>Offline Payment Details</Header>
            <Label>
              Name : 
              <Input
                type="text"
                name="uname"
                value={offlinePaymentDetails.uname}
                onChange={(e) => handleInputChange(e, 'offline')}
              />
            </Label>
            <Label>
              State :
              <Input
                type="text"
                name="address"
                value={offlinePaymentDetails.address}
                onChange={(e) => handleInputChange(e, 'offline')}
              />
            </Label>
            <Label>
              City:
              <Input
                type="text"
                name="city"
                value={offlinePaymentDetails.city}
                onChange={(e) => handleInputChange(e, 'offline')}
              />
            </Label>
            <Label>
              Location:
              <Input
                type="text"
                name="location"
                value={offlinePaymentDetails.location}
                onChange={(e) => handleInputChange(e, 'offline')}
              />
            </Label>
            <Label>
              PIN:
              <Input
                type="text"
                name="pin"
                value={offlinePaymentDetails.pin}
                onChange={(e) => handleInputChange(e, 'offline')}
              />
            </Label>
            <Label>
              Mob.No:
              <Input
                type="text"
                name="mnumber"
                value={offlinePaymentDetails.mnumber}
                onChange={(e) => handleInputChange(e, 'offline')}
              />
            </Label>
            <Label>
               Date:
              <Input
                type="text"
                name="odate"
                value={offlinePaymentDetails.odate}
                onChange={(e) => handleInputChange(e, 'offline')}
              />
            </Label>
            <Label>
              Total:
              <span>
              <FormatPrice price={shipping_fee + total_price} />
              </span>
            </Label>
          </div>
        )}
         
        {paymentType === 'online' && (
          <div>
            <Header>Online Payment Details</Header>
            <Label>
              Select Payment Method:
              <Select value={onlinePaymentMethod} onChange={(e) => handleInputChange(e, 'online')}>
                <option value="" disabled>Select...</option>
                {onlinePaymentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Label>
            {onlinePaymentMethod === 'Credit Card' && (
             
              <PaymentForm>
              <h1>Make a Donation Throw Credit Card</h1>
              <div class="donation-amount">
                <input
                  type="number"
                  name ="damount"
                  placeholder="Pay Amount"
                  value={creditCardDetails.damount}
                  onChange={(e) => handleOnlinePaymentDetailsChange(e, 'creditCard')}
                  style={{ width: '100%' }}
                />
              </div>
              <div class="name">
                <input
                  type="text"
                  placeholder="Name"
                  name="uname"
                  value={creditCardDetails.uname}
                  onChange={(e) => handleOnlinePaymentDetailsChange(e, 'creditCard')}
                  style={{ width: '100%' }}
                />
              </div>
              <div class="email">
                <input
                  type="email"
                  placeholder="Email"
                  name="uemail"
                  value={creditCardDetails.uemail}
                  onChange={(e) => handleOnlinePaymentDetailsChange(e, 'creditCard')}
                  style={{ width: '100%' }}
                />
              </div>
              <div class="billing-address">
                <input
                  type="text"
                  placeholder="Full Address"
                  name="baddress"
                  value={creditCardDetails.baddress}
                  onChange={(e) => handleOnlinePaymentDetailsChange(e, 'creditCard')}
                  style={{ width: '100%' }}
                />
              </div>
              <div class="card-number">
                <input
                  type="text"
                  name = "cardNumber"
                  placeholder="Card Number"
                  value={creditCardDetails.cardNumber}
                  onChange={(e) => handleOnlinePaymentDetailsChange(e, 'creditCard')}
                  style={{ width: '100%' }}
                />
              </div>
              <div class="expiration-date">
                <input
                  type="text"
                  name= "expiryDate"
                  placeholder="Expiration Date"
                  value={creditCardDetails.expiryDate}
                  onChange={(e) => handleOnlinePaymentDetailsChange(e, 'creditCard')}
                  style={{ width: '100%' }}
                />
              </div>
              <div class="cvc">
                <input
                  type="text"
                  name ="cvv"
                  placeholder="CVC"
                  value={creditCardDetails.cvv}
                  onChange={(e) => handleOnlinePaymentDetailsChange(e, 'creditCard')}
                  style={{ width: '100%' }}
                />
              </div>
              <div class="Mobile-Number">
                <input
                  type="text"
                  name ="mnumber"
                  placeholder="Mobile Number"
                  value={creditCardDetails.mnumber}
                  onChange={(e) => handleOnlinePaymentDetailsChange(e, 'creditCard')}
                  style={{ width: '100%' }}
                />
              </div>
              <div class="Pin">
                <input
                  type="text"
                  name ="pin"
                  placeholder="Pin"
                  value={creditCardDetails.pin}
                  onChange={(e) => handleOnlinePaymentDetailsChange(e, 'creditCard')}
                  style={{ width: '100%' }}
                />
              </div>
              <div class="Order-Date">
                <input
                  type="text"
                  name ="odate"
                  value={creditCardDetails.odate}
                  onChange={(e) => handleOnlinePaymentDetailsChange(e, 'creditCard')}
                  style={{ width: '100%' }}
                />
              </div>
              <Label>
              Total To pay:
              <span>
              <FormatPrice price={shipping_fee + total_price} />
              </span>
            </Label>
             
            </PaymentForm>
            )}
            {onlinePaymentMethod === 'Debit Card' && (
               <PaymentForm>
               <h1>Make a Donation Throw Debit Card</h1>
               <div class="donation-amount">
                 <input
                   type="number"
                   name ="damount"
                   placeholder="Pay Amount"
                   value={debitCardDetails.damount}
                   onChange={(e) => handleOnlinePaymentDetailsChange(e, 'debitCard')}
                   style={{ width: '100%' }}
                 />
               </div>
               <div class="name">
                 <input
                   type="text"
                   placeholder="Name"
                   name="uname"
                   value={debitCardDetails.uname}
                   onChange={(e) => handleOnlinePaymentDetailsChange(e, 'debitCard')}
                   style={{ width: '100%' }}
                 />
               </div>
               <div class="email">
                 <input
                   type="email"
                   placeholder="Email"
                   name="uemail"
                   value={debitCardDetails.uemail}
                   onChange={(e) => handleOnlinePaymentDetailsChange(e, 'debitCard')}
                   style={{ width: '100%' }}
                 />
               </div>
               <div class="billing-address">
                 <input
                   type="text"
                   placeholder="Full Address"
                   name="baddress"
                   value={debitCardDetails.baddress}
                   onChange={(e) => handleOnlinePaymentDetailsChange(e, 'debitCard')}
                   style={{ width: '100%' }}
                 />
               </div>
               <div class="card-number">
                 <input
                   type="text"
                   name = "cardNumber"
                   placeholder="Card Number"
                   value={debitCardDetails.cardNumber}
                   onChange={(e) => handleOnlinePaymentDetailsChange(e, 'debitCard')}
                   style={{ width: '100%' }}
                 />
               </div>
               <div class="expiration-date">
                 <input
                   type="text"
                   name= "expiryDate"
                   placeholder="Expiration Date"
                   value={debitCardDetails.expiryDate}
                   onChange={(e) => handleOnlinePaymentDetailsChange(e, 'debitCard')}
                   style={{ width: '100%' }}
                 />
               </div>
               <div class="cvc">
                 <input
                   type="text"
                   name ="cvv"
                   placeholder="CVC"
                   value={debitCardDetails.cvv}
                   onChange={(e) => handleOnlinePaymentDetailsChange(e, 'debitCard')}
                   style={{ width: '100%' }}
                 />
               </div>
               <div class="Mobile-Number">
                <input
                  type="text"
                  name ="mnumber"
                  placeholder="Mobile Number"
                  value={debitCardDetails.mnumber}
                  onChange={(e) => handleOnlinePaymentDetailsChange(e, 'debitCard')}
                  style={{ width: '100%' }}
                />
              </div>
               <div class="Pin">
                 <input
                   type="text"
                   name ="pin"
                   placeholder="Pin"
                   value={debitCardDetails.pin}
                   onChange={(e) => handleOnlinePaymentDetailsChange(e, 'debitCard')}
                   style={{ width: '100%' }}
                 />
               </div>
               <div class="Order Date">
                 <input
                   type="text"
                   name ="odate"
                   value={debitCardDetails.odate}
                   onChange={(e) => handleOnlinePaymentDetailsChange(e, 'debitCard')}
                   style={{ width: '100%' }}
                 />
               </div>
               <Label>
               Total To pay:
               <span>
               <FormatPrice price={shipping_fee + total_price} />
               </span>
             </Label>
              
             </PaymentForm>
            )}
            
          </div>
        )}
         <Button type="button" onClick={handlePayment}>
          Pay
        </Button>
      </FormContainer>
    </Container>
  );
};

export default Payment;




















// import React, { useState } from 'react';
// import styled from 'styled-components';

// const PaymentForm = styled.form`
//   width: 400px;
//   margin: 0 auto;
//   padding: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;

//   h1 {
//     text-align: center;
//     font-size: 24px;
//     margin-bottom: 20px;
//   }

//   .donation-amount {
//     margin-bottom: 10px;
//   }

//   .name {
//     margin-bottom: 10px;
//   }

//   .email {
//     margin-bottom: 10px;
//   }

//   .billing-address {
//     margin-bottom: 10px;
//   }

//   .card-number {
//     margin-bottom: 10px;
//   }

//   .expiration-date {
//     margin-bottom: 10px;
//   }

//   .cvc {
//     margin-bottom: 10px;
//   }

//   button {
//     width: 100%;
//     border: none;
//     outline: none;
//     font-size: 16px;
//     font-weight: bold;
//     color: #fff;
//     background-color: #000;
//     cursor: pointer;
//   }
// `;

// function PaymentForm() {
//   const [donationAmount, setDonationAmount] = useState(0);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [billingAddress, setBillingAddress] = useState('');
//   const [cardNumber, setCardNumber] = useState('');
//   const [expirationDate, setExpirationDate] = useState('');
//   const [cvc, setCvc] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(donationAmount, name, email, billingAddress, cardNumber, expirationDate, cvc);
//   };

//   return (
//     <PaymentForm>
//       <h1>Make a Donation</h1>
//       <div class="donation-amount">
//         <input
//           type="number"
//           placeholder="Donation Amount"
//           value={donationAmount}
//           onChange={(e) => setDonationAmount(e.target.value)}
//         />
//       </div>
//       <div class="name">
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </div>
//       <div class="email">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div class="billing-address">
//         <input
//           type="text"
//           placeholder="Billing Address"
//           value={billingAddress}
//           onChange={(e) => setBillingAddress(e.target.value)}
//         />
//       </div>
//       <div class="card-number">
//         <input
//           type="text"
//           placeholder="Card Number"
//           value={cardNumber}
//           onChange={(e) => setCardNumber(e.target.value)}
//         />
//       </div>
//       <div class="expiration-date">
//         <input
//           type="text"
//           placeholder="Expiration Date"
//           value={expirationDate}
//           onChange={(e) => setExpirationDate(e.target.value)}
//         />
//       </div>
//       <div class="cvc">
//         <input
//           type="text"
//           placeholder="CVC"
//           value={cvc}
//           onChange={(e) => setCvc(e.target.value)}
//         />
//       </div>
//       <button type="submit" onClick={handleSubmit}>Make Payment</button>
//     </PaymentForm>
//   );
// }

// export default PaymentForm;
