import React, { useState } from 'react'
import { NavLink,useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css"

const Register = () => {
    const navigate = useNavigate();
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });
    const [userType, setUserType] = useState("");
    const [secretkey, setsecretkey] = useState("");
    const setVal = (e) => {
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addUserdata = async (e) => {
        if(userType==="Admin"&& secretkey!=="nitin"){
            e.preventDefault();
            toast.warning("Invalid admin!", {
                position: "top-center"
            });
        }
        else{
        e.preventDefault();

        const { fname, email, password, cpassword } = inpval;

        if (fname === "") {
            toast.warning("name is required!", {
                position: "top-center"
            });
        } else if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        } else if (cpassword === "") {
            toast.error("cpassword is required!", {
                position: "top-center"
            });
        }
        else if (cpassword.length < 6) {
            toast.error("confirm password must be 6 char!", {
                position: "top-center"
            });
        } else if (password !== cpassword) {
            toast.error("pass and Cpass are not matching!", {
                position: "top-center"
            });
        } else {
            const data = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword,userType
                })
            });

            const res = await data.json();
              if(res.status === 422 || !res){
                toast.warning("Invalid Registration 😃!", {
                    position: "top-center"
                });
              }
            else {
                if(!registrationSuccess) {
                toast.success("Registration Successfully done 😃!", {
                    position: "top-center",
                    autoClose: 2000,
                });
                setRegistrationSuccess(true);
                    navigate("/login") ;
               
            }
          }
        }
    }
}
    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>You can make your account here</p>
                    </div>

                    <form>
                        <h4 style={{fontSize:'18px',display:'flex',textAlign:'center',justifyContent:'center'}}>register as:</h4>
                        <div >
                            <input type="radio"  value="User" name="UserType" onChange={(e)=>setUserType(e.target.value)}/>
                            <h4 style={{paddingBottom: '12px',fontSize:'15px'}}>User</h4>
                        </div>
                        
                        <div >
                            <input type="radio"  value="Admin" name="UserType" onChange={(e)=>setUserType(e.target.value)} />
                            <h4 style={{paddingBottom: '12px',fontSize:'15px'}}>Admin</h4>
                        </div>
                         <br />
                         {userType==="Admin"? <div className="form_input">
                            <label htmlFor="key">Secret key</label>
                            <input type="text"onChange={(e)=>setsecretkey(e.target.value)}  placeholder='Enter Your Key' />
                        </div>:null}
                       

                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" onChange={setVal} value={inpval.fname} name="fname" id="fname" placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={setVal} name="cpassword" id="cpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={addUserdata}>Sign Up</button>
                        <p>Already have an account? <NavLink to="/">Log In</NavLink></p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Register