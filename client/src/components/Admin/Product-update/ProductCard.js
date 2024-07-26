import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    navigate(`/update-product/${product._id}`);
  };

  return (
    <Card>
      <Image src={"../../" + product.image} alt={product.name} />
      <Info>
        <Name>{product.name}</Name>
        <Company>{product.company}</Company>
        <Price>${product.price}</Price>
      </Info>
      <Button onClick={handleUpdateClick}>Update</Button>
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 300px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Name = styled.h2`
  font-size: 18px;
  margin: 8px 0;
`;

const Company = styled.p`
  font-size: 14px;
  color: #555;
`;

const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 8px 0;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: stretch;
  margin-top: auto;

  &:hover {
    background-color: #2980b9;
  }
`;

export default ProductCard;
