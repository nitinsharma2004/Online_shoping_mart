import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Products from "./Products";
import Contact from "./Contact";
import Cart from "./Cart";
import SingleProduct from "./SingleProduct";
import ErrorPage from "./ErrorPage";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login";
import Register from "./components/Register";
// import Dashboard from "./components/Admin/Dashbord/Dashboard";
import Payment from "./components/Payment";
import { useLoginContext } from "./context/logincontext";
import Cartdetail from "./components/Admin/Cartdetail";
import Assign from "./components/Admin/Assign";
import Orderhistory from "./components/Admin/Orderhistory";
import Delivery from "./components/Delivery";
import Onlineassign from "./components/Admin/Onlineassign";
// import MainContent from "./components/Admin/MainContent";
import AdminDashboard from "./components/Admin/Dashbord/AdminDashboard";
import ProductList from "./components/Admin/Product-update/ProductList";
import UpdateProductForm from "./components/Admin/Product-update/UpdateProductForm";
const userTheme = {
  colors: {
    heading: "rgb(24 24 29)",
    text: "rgba(29 ,29, 29, .8)",
    white: "#fff",
    black: " #212529",
    helper: "#8490ff",

    bg: "#F6F8FA",
    footer_bg: "#0a1435",
    btn: "rgb(98 84 243)",
    border: "rgba(98, 84, 243, 0.5)",
    hr: "#ffffff",
    gradient:
      "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
    shadow:
      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
    shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",  },

    media: {
      mobile: "768px",
      tab: "998px",
    },
};


const App = () => {
const [usertype] = useLoginContext();
  return (
    <>
    <ToastContainer />
    {usertype.user === "User" || usertype.user===null? (
        <ThemeProvider theme={userTheme}>
          <Router>
            <GlobalStyle />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/singleproduct/:id" element={<SingleProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
          </Router>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={userTheme}>
          <Router>
            <GlobalStyle />
            <Routes>
              <Route path="/Admin/dashboard" element={<AdminDashboard/>} />
              <Route path="/Admin/cartdetail" element={<Cartdetail />} />
              <Route path="/Admin/assign/:productId" element={<Assign />} />
              <Route path="/Admin/onlineassign/:productId" element={<Onlineassign />} />  
              <Route path="/Admin/history" element={<Orderhistory />} />    
              <Route path="/Admin/product" element={<ProductList />} />  
              <Route path="/update-product/:_id" element={<UpdateProductForm />} />  
                  </Routes>
          </Router>
        </ThemeProvider>
      )}
    </>
  );
};

export default App;
