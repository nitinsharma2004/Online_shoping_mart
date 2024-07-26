import { createContext,useContext, useEffect, useState } from "react";

const logincontext = createContext();
    
const LoginProvider = ({ children }) => {
    const [auth, setAuth] = useState({
      user: null,
      token: ""
    });
  console.log("hello");
    useEffect(() => {
      const data = localStorage.getItem('auth');
      
      if (data) {
        const parsedData = JSON.parse(data);
        setAuth(prevAuth => ({
          ...prevAuth,
          user: parsedData.usertype,
          token: parsedData.token
        }));
      }
    }, []);
  
    return (
      <logincontext.Provider value={[auth, setAuth]}>
        {children}
      </logincontext.Provider>
    );
  };
  

const useLoginContext = () => {
    return useContext(logincontext);
};
export  { logincontext, LoginProvider, useLoginContext };
