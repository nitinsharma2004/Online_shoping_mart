import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ProductForm = () => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    company: '',
    price: 0,
    colors: [],
    image: null,
    description: '',
    category: '',
    featured: false,
    star: 0,
    reviews: 0,
    stocks: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === 'colors') {
      setProduct({ ...product, [name]: value.split(',').map((color) => color.trim()) });
    } else if (name === 'image') {
      setProduct({ ...product, [name]: files[0] });
    } else if (type === 'checkbox') {
      setProduct({ ...product, [name]: e.target.checked });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(product).forEach((key) => {
        if (key === 'colors') {
          formData.append(key, JSON.stringify(product[key]));
        } else {
          formData.append(key, product[key]);
        }
      });

      await axios.post('http://localhost:8009/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Product added successfully!');
      setProduct({
        id: '',
        name: '',
        company: '',
        price: 0,
        colors: [],
        image: null,
        description: '',
        category: '',
        featured: false,
        star: 0,
        reviews: 0,
        stocks: 0,
      });
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Product Upload Section</h2>
      <GridTwoColumn>
        <div>
          <Label>ID:</Label>
          <Input type="text" name="id" value={product.id} onChange={handleChange} required />

          <Label>Name:</Label>
          <Input type="text" name="name" value={product.name} onChange={handleChange} required />

          <Label>Company:</Label>
          <Input type="text" name="company" value={product.company} onChange={handleChange} required />

          <Label>Price:</Label>
          <Input type="number" name="price" value={product.price} onChange={handleChange} required />

          <Label>Colors:</Label>
          <Input type="text" name="colors" value={product.colors.join(', ')} onChange={handleChange} required />

          <Label>Image:</Label>
          <Input type="file" name="image" onChange={handleChange} accept=".jpg, .jpeg, .png" required />
        </div>

        <div>
          <Label>Description:</Label>
          <TextArea name="description" value={product.description} onChange={handleChange} required />

          <Label>Category:</Label>
          <Input type="text" name="category" value={product.category} onChange={handleChange} required />

          <CheckboxContainer>
            <Input type="checkbox" name="featured" checked={product.featured} onChange={handleChange} />
            <Label>Featured</Label>
          </CheckboxContainer>

          <Label>Star:</Label>
          <Input type="number" name="star" value={product.star} onChange={handleChange} />

          <Label>Reviews:</Label>
          <Input type="number" name="reviews" value={product.reviews} onChange={handleChange} />

          <Label>Stocks:</Label>
          <Input type="number" name="stocks" value={product.stocks} onChange={handleChange} />
        </div>
      </GridTwoColumn>
      <Button type="submit">Add Product</Button>
    </FormContainer>
  );
};

const GridTwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormContainer = styled.form`
  max-width: 900px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    text-align: center;
  }
`;

const Label = styled.label`
  padding-bottom: 10px;
  font-size: 16px;
  color: #333;
  margin: 10px 0;
`;

const Input = styled.input`
  padding: 8px;
  width: 100%;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  width: 100%;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  label {
    margin-left: 8px;
    font-size: 16px;
  }
`;

const Button = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin: 0 auto;
  text-align: center;

  &:hover {
    background-color: #2980b9;
  }
`;

export default ProductForm;
