import React from 'react';
import ProductForm from './ProductForm';
import AdminApp from './AdminApp';
import Cartdetail from '../Cartdetail';

const AdminDashboard = () => {
  return (
    <AdminApp>
      <ProductForm />
    </AdminApp>
  );
};

export default AdminDashboard;
