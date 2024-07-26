import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Adminnavbar from './Dashbord/Adminnavbar';
import FormatPrice from '../../Helpers/FormatPrice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API = "http://localhost:8009/admin/order_detail";

const Orderhistory = () => {
  const [orders, setOrders] = useState([]);

  const getData = async (url) => {
    try {
      const res = await axios.get(url);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(API);
  }, []);

  const handleDeleteClick = async (orderId) => {
    try {
      const res = await axios.delete(`http://localhost:8009/admin/order_detail/${orderId}`);
      if (res.status === 401) {
        toast.warning("Error Occurring. Try Again 😃!", {
          position: "top-center"
        });
      } else {
        toast.success("Deleted Successfully 😃!", {
          position: "top-center",
          autoClose: 2000,
        });
        setOrders(orders.filter(order => order._id !== orderId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Adminnavbar />
      <Wrapper className="section">
        <div className="container">
          {orders.map((curElem) => (
            <Card key={curElem._id}>
              <CardContent>
                {curElem.product.items.map((item) => (
                  <ItemContent key={item.id}>
                    <figure>
                      <img src={"../" + item.image} alt={item.name} />
                    </figure>
                    <ItemDetails>
                      <h3><span>Product Name:</span> {item.name}</h3>
                      <h3><span>Amount:</span> {item.amount}</h3>
                      <h3><span>Color:</span>
                        <ColorSwatch color={item.color} />
                      </h3>
                    </ItemDetails>
                  </ItemContent>
                ))}
              </CardContent>
              <CardData>
                {curElem.product.type === "offline" ? (
                  <>
                    <h3><span>Payment Method:</span> {curElem.product.usertype}</h3>
                    <h3><span>Address:</span> {curElem.product.address}</h3>
                    <h3><span>City:</span> {curElem.product.city}</h3>
                    <h3><span>Location:</span> {curElem.product.location}</h3>
                    <h3><span>Pin:</span> {curElem.product.pin}</h3>
                    <h3><span>Number:</span> {curElem.product.mnumber}</h3>
                  </>
                ) : (
                  <>
                    <h3><span>Payment Method:</span> {curElem.product.usertype}</h3>
                    <h3><span>Paid Amount:</span> {curElem.product.bamount}</h3>
                    <h3><span>Address:</span> {curElem.product.baddress}</h3>
                    <h3><span>Name:</span> {curElem.product.uname}</h3>
                    <h3><span>Email:</span> {curElem.product.uemail}</h3>
                    <h3><span>Expiry Date:</span> {curElem.product.expiryDate}</h3>
                    <h3><span>CVC:</span> {curElem.product.cvv}</h3>
                  </>
                )}
                <h3><span>Pin:</span> {curElem.product.pin}</h3>
                <h3><span>Mob. No.:</span> {curElem.product.mnumber}</h3>
                <h3><span>Order Date:</span> {formatDate(curElem.product.odate)}</h3>
                <h3><span>Shipping Date:</span> {formatDate(curElem.sdate)}</h3>
                <h3><span>Delivery Date:</span> {formatDate(curElem.ddate)}</h3>
                <div>
                  <p><span>Total Amount:</span></p>
                  <p><FormatPrice price={curElem.product.total} /></p>
                </div>
                <DeleteButton onClick={() => handleDeleteClick(curElem._id)}>
                  Delete
                </DeleteButton>
              </CardData>
            </Card>
          ))}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  padding: 3rem 0;
  background-color: ${({ theme }) => theme.colors.bg};

  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 120rem;
    margin: 0 auto;
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItemContent = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  figure {
    margin: 0;
    img {
      max-width: 100px;
      height: auto;
      border-radius: 0.5rem;
    }
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0.5rem 0;
    span {
      color: blue;
    }
  }
`;

const ColorSwatch = styled.button`
  background-color: ${({ color }) => color};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  cursor: default;
`;

const CardData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DeleteButton = styled.div`
  height: 40px;
  margin: 1rem 0;
  background-color: #00adff;
  border: 1px solid ${({ theme }) => theme.colors.btnBorder};
  color: ${({ theme }) => theme.colors.btnText};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #00adff;
    color: ${({ theme }) => theme.colors.btnHoverText};
  }
`;

export default Orderhistory;
