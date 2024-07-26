import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../styles/Button';
import FormatPrice from '../../Helpers/FormatPrice';

const API = "http://localhost:8009/api/online-payments";

const Onlinecard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getData = async (url) => {
    try {
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(API);
  }, []);

  const handleAssignClick = (productId) => {
    navigate(`/Admin/onlineassign/${productId}`);
  };

  return (
    <Wrapper>
      {products.map((product) => (
        <Card key={product._id}>
          <ContentContainer>
            {product.items.map((item) => (
              <div key={item.id} style={{ display: 'flex' }}>
                <Firstcontent>
                  <figure>
                    <img src={"../" + item.image} alt={item.name} />
                  </figure>
                </Firstcontent>
                <Secondcontent>
                  <div className="card-data">
                    <h3><span style={{ color: 'blue' }}>Product Name:</span> {item.name}</h3>
                    <h3><span style={{ color: 'blue' }}>Amount:</span> {item.amount}</h3>
                    <h3 style={{ color: 'blue' }}>Color:</h3>
                    <button
                      type="button"
                      value={item.color}
                      name="color"
                      style={{ backgroundColor: item.color, width: '15px', height: '15px' }}
                    />
                  </div>
                </Secondcontent>
              </div>
            ))}
          </ContentContainer>
          <ContentContainer>
            <Firstcontent>
              <h3><span style={{ color: 'blue' }}>Paid Amount:</span> {product.bamount}</h3>
              <h3><span style={{ color: 'blue' }}>Full Address:</span> {product.baddress}</h3>
              <h3><span style={{ color: 'blue' }}>Name:</span> {product.uname}</h3>
              <h3><span style={{ color: 'blue' }}>Email:</span> {product.uemail}</h3>
              <h3><span style={{ color: 'blue' }}>Payment Method:</span> {product.usertype}</h3>
            </Firstcontent>
            <Secondcontent>
              <h3><span style={{ color: 'blue' }}>Expiry Date:</span> {product.expiryDate}</h3>
              <h3><span style={{ color: 'blue' }}>CVC:</span> {product.cvv}</h3>
              <h3><span style={{ color: 'blue' }}>Pin:</span> {product.pin}</h3>
              <h3><span style={{ color: 'blue' }}>Mobile Number:</span> {product.mnumber}</h3>
              <p>
                <FormatPrice price={product.total} />
              </p>
            </Secondcontent>
          </ContentContainer>
          <ButtonWrapper>
            <Button className="btn"  style={{ width: '100%' }} onClick={() => handleAssignClick(product._id)}>
              Assign
            </Button>
          </ButtonWrapper>
        </Card>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  flex: 1 1 calc(90% - 20px); /* Increase card size for mobile */
    max-width: calc(90% - 20px); /* Increase card size for mobile */
  margin: 10px;
  display: flex;
  flex-direction: column;
  border: 0.1rem solid rgb(170 170 170 / 40%);
  overflow: hidden;
  position: relative;

  @media (min-width: 768px) {
    flex: 1 1 calc(50% - 20px); /* Two cards per row on tablets and up */
    max-width: calc(50% - 20px); /* Two cards per row on tablets and up */
  }

  @media (min-width: 1100px) {
    flex: 1 1 calc(33.333% - 20px); /* Three cards per row on larger screens */
    max-width: calc(33.333% - 20px); /* Three cards per row on larger screens */
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-grow: 1;
`;

const Firstcontent = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;

  figure {
    margin: 0;
    width: 100%;
    height: auto;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const Secondcontent = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  
`;

export default Onlinecard;

