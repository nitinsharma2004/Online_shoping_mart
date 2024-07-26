import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import FormatPrice from '../../Helpers/FormatPrice';
import Adminnavbar from './Dashbord/Adminnavbar';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Onlineassign = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProductDetails] = useState(null);

    const [inpval, setInpval] = useState({
      sdate: "",
      ddate: "",
  });
  const setVal = (e) => {
      const { name, value } = e.target;

      setInpval(() => {
          return {
              ...inpval,
              [name]: value
          }
      })
  };

  const addUserdata = async (e) => {
    e.preventDefault();

    const { sdate, ddate} = inpval;

    if (sdate === "") {
        toast.warning("shipping date is required!", {
            position: "top-center"
        });
    } else if (ddate === "") {
        toast.warning("delivery date is required!", {
            position: "top-center"
        });
    } else {
      try{
     const result =  await axios.delete(`http://localhost:8009/api/online-payments/${productId}`);
     if(result.status===200){
      toast.success("Delete Successfully 😃!", {
        position: "top-center"
    });
     }
     else{
      toast.warning("unable to Delete 😃!", {
        position: "top-center"
    });
     }
      }catch(e){
       console.log(e);
      }
      try{
        const data = await fetch("/admin/order_detail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              sdate, ddate,product
            })
        });

        const res = await data.json();
          if(res.status === 401 || !res){
            toast.warning("Order Assign Not Successfully 😃!", {
                position: "top-center"
            });
          }
        else {
           
            toast.success("Order Assign Successfully 😃!", {
                position: "top-center",
                autoClose: 2000,
            });
                navigate("/Admin/cartdetail");
      }
    }catch(e){
      console.log(e);
    }
    }
}

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8009/api/online-payments/${productId}`);
          if(response.status===404){
            toast.warning("Error Occuring Try Again 😃!", {
              position: "top-center"
          });
          }
          else{
            toast.success("done 😃!", {
              position: "top-center",
              autoClose: 2000,
          });
          }
          setProductDetails(response.data);
        } catch (error) {
          console.error('Error fetching product details', error);
        }
      };
  
      if (productId) {
        fetchData();
      }
    }, [productId]);
    return (   
        <>
        <Container>
        <Adminnavbar/>
        <MainContent>
            <Firstcontent>
            <Wrapper className="section">
        
        <div className="container grid">
        
          {product && (
            <div className="card grid-two-column" key={product._id}>
              {product.items.map((item) => (
                <div key={item.id} style={{ display: 'flex' }}>
                  <Firstcontent>
                    <figure>
                      <img src={"../../" + item.image} alt={item.name} />
                    </figure>
                  </Firstcontent>
                  <Secondcontent>
                    <div className="card-data">
                      <h3><span style={{color:'blue'}}>Product Name:</span> {item.name}</h3>
                      <h3><span style={{color:'blue'}}>Amount:</span> {item.amount}</h3>
                      <h3 style={{color:'blue'}}>Color:</h3>
                    <button
                    type="button"
                    value={item.color}
                    name="color"
                    style={{ backgroundColor: item.color,width:'15px',height:'15px'}}>
                  </button>
                 
                    </div>
                  </Secondcontent>
                </div>
              ))}
              <div style={{ display: 'flex' }}>
              <Firstcontent>
                <h3><span style={{color:'blue'}}>Paid Amount:</span> {product.bamount}</h3>
                <h3><span style={{color:'blue'}}>Address:</span> {product.baddress}</h3>
              <h3><span style={{color:'blue'}}>Name :</span> {product.uname}</h3>
              <h3><span style={{color:'blue'}}>Email:</span> {product.uemail}</h3>
                </Firstcontent>
                <Secondcontent>
             <h3><span style={{color:'blue'}}>Expiry Date:</span> {product.expiryDate}</h3>
             <h3><span style={{color:'blue'}}>CVC:</span> {product.cvv}</h3>
             <h3><span style={{color:'blue'}}>Pin:</span>{product.pin}</h3>
              <h3><span style={{color:'blue'}}>Mob.No.:</span> {product.mnumber}</h3>
              <p>
                <FormatPrice price={product.total} />
              </p>         
              </Secondcontent>
              </div>
            </div>
          )}
        </div>
      </Wrapper>

            </Firstcontent>
            <Secondcontent>
            <StyledForm>
                <h3>Order Delivery Details:</h3>

                {product && (
                  <div className="form_input">
                    <label htmlFor="Odate">Ordered Date</label>
                    <input type="text" readOnly value={product.odate} name="Odate" />
                  </div>
                )}

                <div className="form_input">
                  <label htmlFor="Sdate">Shipping Date</label>
                  <input type="text" onChange={setVal} value={inpval.sdate} name="sdate" placeholder='Enter Shipping date' />
                </div>

                <div className="form_input">
                  <label htmlFor="Ddate">Delivery Date</label>
                  <input type="text" onChange={setVal} value={inpval.ddate} name="ddate" placeholder='Enter Delivery date' />
                </div>

                <button className='btn' onClick={addUserdata}>Assign</button>
              </StyledForm>

            </Secondcontent>
        </MainContent>
    </Container>
      </>
    );
  };
  
const Wrapper = styled.section`
padding: 9rem 0;

.container {
  max-width: 120rem;
}

.grid {
  gap: 3.2rem;
 
}

figure {
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: all 0.5s linear;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.2s linear;
    cursor: pointer;
  }
  &:hover::after {
    width: 100%;
  }
  &:hover img {
    transform: scale(1.2);
  }
  img {
    max-width: 90%;
    margin-top: 1.5rem;
    height: 20rem;
    transition: all 0.2s linear;
  }
}

.card {
    width:650px;
  border: 0.1rem solid rgb(170 170 170 / 40%);
  overflow: hidden;

  .card-data {
    padding: 0 2rem;
  }

  h3 {
    margin: 2rem 0;
    font-weight: 300;
    font-size: 2.4rem;
    text-transform: capitalize;
  }

  .btn {
    margin: 2rem 0;
    background-color: rgb(0 0 0 / 0%);
    border: 0.1rem solid rgb(98 84 243);
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(98 84 243);

    &:hover {
      background-color: rgb(98 84 243);
    }

    &:hover a {
      color: #fff;
    }
    a {
      color: rgb(98 84 243);
      font-size: 1.4rem;
    }
  }

  .btn-main .btn:hover {
    color: #fff;
  }
}
`;
const Container = styled.div`
display: flex;
height: 100vh;
`;
const MainContent = styled.div`
flex-grow: 1;
padding: 20px;
display: flex;
flex-direction: row;
`;
const Firstcontent = styled.div`
flex-grow: 1;
padding: 20px;
display: flex;
flex-direction: column;

`;
const Secondcontent = styled.div`
flex-grow: 1;
padding: 20px;
display: flex;
flex-direction: column;

`;

const StyledForm = styled.form`
  margin-top:auto;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h3 {
    text-align: center;
  }

  .form_input {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
    }
  }

  .btn {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;
export default Onlineassign;
