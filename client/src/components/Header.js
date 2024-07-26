import React, { createContext, useReducer } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";
import { initialState,reducer } from "../reducer/navreducer";
export const userContext = createContext();
const Header = () => {
  const headingStyle = {
    fontSize: '30px',  
    color: 'black',    
    textAlign: 'center',  
    padding: '10px',   
    margin: '0',       
    textTransform: 'uppercase', 
    fontWeight: 'bold', 
  };
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <>
   
    <MainHeader>
    <NavLink to="/">
      <h2 style={headingStyle}>Nitin Mart</h2>
      {/* <img src="./images/logo.png" alt="my logo img" style={imageStyle} /> */}
    </NavLink>
      < userContext.Provider value={{state,dispatch}}>
      <Nav />
      </userContext.Provider>
    </MainHeader>
   
    </>
  );
};

const MainHeader = styled.header`
  padding: 0 1.5rem;
  height: 10rem;
  background-color: #c4ccd4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  
`;
export default Header;
