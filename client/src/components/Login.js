import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './mix.css';
import { useLoginContext } from '../context/logincontext';

//Login Form

const Login = () => {

    const [passShow, setPassShow] = useState(false);
    const [auth,setauth] = useLoginContext();
    const [inpval, setInpval] = useState({
        email: '',
        password: '',
        user:'',
    });
    const navigate = useNavigate();
    const setVal = (e) => {
        const { name, value } = e.target;
        setInpval((prevInput) => {
            return {
                ...prevInput,
                [name]: value,
            };
        });
    };

    // User Authentication
    const loginuser = async (e) => {
        e.preventDefault();

        const { email, password,user } = inpval;

        if (email === '') {
            toast.error('Email is required!', {
                position: 'top-center',
            });
         } else if (user === '') {
                toast.error('user is required!', {
                    position: 'top-center',
                });
        } else if (!email.includes('@')) {
            toast.warning('Include @ in your email!', {
                position: 'top-center',
            });
        } else if (password === '') {
            toast.error('Password is required!', {
                position: 'top-center',
            });
        } else if (password.length < 6) {
            toast.error('Password must be 6 characters!', {
                position: 'top-center',
            });
        } else {
            const data = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    user
                })
            });
              
            try {
                const res = await data.json();
                console.log(res);
                if (data.status === 401||!res) {
                    toast.warning("Invalid email or password", {
                        position: "top-center",
                    });
                }
                else if (res.result.usertype === "Admin") {
                    toast.success("Admin Login Successful 😃!", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    setauth({
                        ...auth,
                        user:res.result.usertype,
                        token:res.result.token,
                    });
                    localStorage.setItem('auth',JSON.stringify(res.result));
                    navigate("/Admin/dashboard");
                }
                else {
               
                //   if(!registrationSuccess) { 
                    toast.success("Login Successful 😃!", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    setauth({
                        ...auth,
                        user:res.result.usertype,
                        token:res.result.token,
                    });
                    localStorage.setItem('auth',JSON.stringify(res.result));
                    navigate("/");
                // }
            }   
            } catch (error) {
                console.error("Error parsing JSON response:", error);
                toast.error("An unexpected error occurred. Please try again later.", {
                    position: "top-center",
                });
            }
        }
    
    };
 
    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are glad you are back. Please log in.</p>
                    </div>

                    <form method='POST'>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                value={inpval.email}
                                onChange={setVal}
                                name="email"
                                id="email"
                                placeholder="Enter Your Email Address"
                            />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input
                                    type={!passShow ? 'password' : 'text'}
                                    onChange={setVal}
                                    value={inpval.password}
                                    name="password"
                                    id="password"
                                    placeholder="Enter Your password"
                                />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? 'Show' : 'Hide'}
                                </div>
                            </div>
                        </div>

                        <div>
                            <input
                                type="radio"
                                name="user"
                                value="User"  
                                onChange={setVal}
                                checked={inpval.user === 'User'}  
                               
                            />
                            <h4  style={{paddingBottom: '12px',fontSize:'15px'}}>User</h4>
                        </div>

                        <div>
                            <input
                                type="radio"
                                name="user"
                                value="Admin"  
                                onChange={setVal}
                                checked={inpval.user === 'Admin'}  
                            />
                            <h4 style={{fontSize:'15px'}}>Admin</h4>
                        </div>

                        <button className="btn" onClick={loginuser}>
                            Login
                        </button>
                        <p>
                            Don't have an Account? <NavLink to="/register">Sign Up</NavLink>{' '}
                        </p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    );
};

export default Login;
