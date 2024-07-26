import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginContext } from '../../../context/logincontext'; 

const Adminnavbar = () => {
  const navigate = useNavigate();
  const [usertype, setusertype] = useLoginContext();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleLogout = async () => {
    setusertype({
      ...usertype,
      user: null,
      token: '',
    });
    localStorage.removeItem('usertype');

    try {
      await fetch('/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      navigate('/login');
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Navbar>
      <Brand>Admin Panel</Brand>
      <ToggleButton onClick={toggleNav}>
        ☰
      </ToggleButton>
      <NavItems isOpen={isNavOpen}>
        <StyledNavLink to="/Admin/dashboard">Dashboard</StyledNavLink>
        <StyledNavLink to="/Admin/cartdetail">Order Product</StyledNavLink>
        <StyledNavLink to="/Admin/history">Order History</StyledNavLink>
        <StyledNavLink to="/Admin/product">Update Product</StyledNavLink>
        <StyledNavLink as="div"  onClick={handleLogout}>Logout</StyledNavLink>
      </NavItems>
    </Navbar>
  );
};

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3498db;
  padding: 10px 20px;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Brand = styled.div`
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const ToggleButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  font-size: 18px;

  &:hover {
    background-color: #2980b9;
  }

  &.active {
    background-color: rgba(0, 0, 0, 0.16);;
  }
`;

export default Adminnavbar;
