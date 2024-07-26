import React from 'react';
import styled from 'styled-components';
import Adminnavbar from './Adminnavbar'; 

const AdminApp = ({ children }) => {
  return (
    <AdminAppContainer>
      <Adminnavbar />
      <MainContent>
        {children}
      </MainContent>
    </AdminAppContainer>
  );
};

const AdminAppContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
`;

export default AdminApp;
