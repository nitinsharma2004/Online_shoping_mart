import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Adminnavbar from '../Dashbord/Adminnavbar';

const UpdateProductForm = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8009/api/products/${_id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error.message);
      }
    };

    fetchProduct();
  }, [_id]);

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
        if (product[key] !== '' && product[key] !== null && product[key] !== undefined) {
          formData.append(key, product[key]);
        }
      });

      await axios.put(`http://localhost:8009/api/products/${_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Product updated successfully!');
      navigate('/Admin/dashboard');
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8009/api/products/${_id}`);
      alert('Product deleted successfully!');
      navigate('/Admin/dashboard');
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  return (
    <>
      <Adminnavbar />
      <FormContainer onSubmit={handleSubmit}>
        <h2 style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', marginTop: '35px' }}>Update Product</h2>
        <GridTwoColumn>
          <div>
            <Label>ID:</Label>
            <Input type="text" name="id" value={product.id} readOnly />

            <Label>Name:</Label>
            <Input type="text" name="name" value={product.name} onChange={handleChange} />

            <Label>Company:</Label>
            <Input type="text" name="company" value={product.company} onChange={handleChange} />

            <Label>Price:</Label>
            <Input type="number" name="price" value={product.price} onChange={handleChange} />

            <Label>Colors:</Label>
            <Input type="text" name="colors" value={product.colors.join(', ')} onChange={handleChange} />

            <Label>Image:</Label>
            <Input type="file" name="image" onChange={handleChange} accept=".jpg, .jpeg, .png" />
          </div>

          <div>
            <Label>Description:</Label>
            <TextArea name="description" value={product.description} onChange={handleChange} />

            <Label>Category:</Label>
            <Input type="text" name="category" value={product.category} onChange={handleChange} />

            <Label>Featured:</Label>
            <Input type="checkbox" name="featured" checked={product.featured} onChange={handleChange} />

            <Label>Star:</Label>
            <Input type="number" name="star" value={product.star} onChange={handleChange} />

            <Label>Reviews:</Label>
            <Input type="number" name="reviews" value={product.reviews} onChange={handleChange} />

            <Label>Stocks:</Label>
            <Input type="number" name="stocks" value={product.stocks} onChange={handleChange} />
          </div>
        </GridTwoColumn>
        <ButtonContainer>
          <Button type="submit">Update Product</Button>
          <DeleteButton type="button" onClick={handleDelete}>Delete Product</DeleteButton>
        </ButtonContainer>
      </FormContainer>
    </>
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: #3498db;
  display: flex;
  text-align: center;
  justify-content: center;
  color: #fff;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 48%;

  &:hover {
    background-color: #2980b9;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #e74c3c;
  width: 48%;

  &:hover {
    background-color: #c0392b;
  }
`;

export default UpdateProductForm;
