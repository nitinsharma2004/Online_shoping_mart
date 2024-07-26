import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FormatPrice from '../../Helpers/FormatPrice';
import Adminnavbar from './Dashbord/Adminnavbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Assign = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProductDetails] = useState(null);
    const [inpval, setInpval] = useState({
        sdate: "",
        ddate: "",
    });

    const setVal = (e) => {
        const { name, value } = e.target;
        setInpval(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addUserdata = async (e) => {
        e.preventDefault();

        const { sdate, ddate } = inpval;

        if (sdate === "") {
            toast.warning("Shipping date is required!", { position: "top-center" });
        } else if (ddate === "") {
            toast.warning("Delivery date is required!", { position: "top-center" });
        } else {
            try {
                const result = await axios.delete(`http://localhost:8009/api/offline-payments/${productId}`);
                if (result.status === 200) {
                    toast.success("Deleted Successfully 😃!", { position: "top-center" });
                } else {
                    toast.warning("Unable to Delete 😃!", { position: "top-center" });
                }
            } catch (e) {
                console.log(e);
            }

            try {
                const response = await fetch("/admin/order_detail", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sdate, ddate, product })
                });
                const res = await response.json();
                if (res.status === 401 || !res) {
                    toast.warning("Order Assign Not Successfully 😃!", { position: "top-center" });
                } else {
                    toast.success("Order Assigned Successfully 😃!", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    navigate("/Admin/cartdetail");
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8009/api/offline-payments/${productId}`);
                if (response.status === 404) {
                    toast.warning("Error Occurred, Try Again 😃!", { position: "top-center" });
                } else {
                    toast.success("Data fetched successfully 😃!", { position: "top-center", autoClose: 2000 });
                    setProductDetails(response.data);
                }
            } catch (error) {
                console.error('Error fetching product details', error);
            }
        };

        if (productId) {
            fetchData();
        }
    }, [productId]);

    return (
        <>
            <Adminnavbar />
            <Container>
                <Wrapper className="section">
                    {product && (
                        <Card className="card">
                            {product.items.map((item) => (
                                <div key={item.id} style={{ display: 'flex' }}>
                                    <Firstcontent>
                                        <figure>
                                            <img src={"../../" + item.image} alt={item.name} />
                                        </figure>
                                    </Firstcontent>
                                    <Secondcontent>
                                        <div className="card-data">
                                            <h3><span style={{ color: 'blue' }}>Product Name:</span> {item.name}</h3>
                                            <h3><span style={{ color: 'blue' }}>Amount:</span> {item.amount}</h3>
                                            {item.color &&
                                                <>
                                                    <h3 style={{ color: 'blue' }}>Color:</h3>
                                                    <button
                                                        type="button"
                                                        value={item.color}
                                                        name="color"
                                                        style={{ backgroundColor: item.color, width: '15px', height: '15px' }}
                                                    />
                                                </>
                                            }
                                        </div>
                                    </Secondcontent>
                                </div>
                            ))}
                            <div style={{ display: 'flex' }}>
                                <Firstcontent>
                                    <h3><span style={{ color: 'blue' }}>Address:</span> {product.address}</h3>
                                    <h3><span style={{ color: 'blue' }}>City:</span> {product.city}</h3>
                                    <h3><span style={{ color: 'blue' }}>Location:</span> {product.location}</h3>
                                </Firstcontent>
                                <Secondcontent>
                                    <h3><span style={{ color: 'blue' }}>Pin:</span> {product.pin}</h3>
                                    <h3><span style={{ color: 'blue' }}>Mobile No.:</span> {product.mnumber}</h3>
                                    <p><FormatPrice price={product.total} /></p>
                                </Secondcontent>
                            </div>
                        </Card>
                    )}
                </Wrapper>
                <StyledForm>
                    <h3>Order Delivery Details:</h3>

                    {product && (
                        <div className="form_input">
                            <label htmlFor="Odate">Ordered Date</label>
                            <input type="text" readOnly value={product.odate} name="Odate" />
                        </div>
                    )}

                    <div className="form_input">
                        <label htmlFor="Sdate">Shipping Date</label>
                        <input type="text" onChange={setVal} value={inpval.sdate} name="sdate" placeholder='Enter Shipping date' />
                    </div>

                    <div className="form_input">
                        <label htmlFor="Ddate">Delivery Date</label>
                        <input type="text" onChange={setVal} value={inpval.ddate} name="ddate" placeholder='Enter Delivery date' />
                    </div>

                    <button className='btn' onClick={addUserdata}>Assign</button>
                </StyledForm>
            </Container>
        </>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Wrapper = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height:auto;
     @media (max-width: 600px) {
        min-height:auto;
    }
`;

const Card = styled.div`
    width: 100%;
    max-width: 600px;
    border: 0.1rem solid rgb(170 170 170 / 40%);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 15px; /* Reduced padding */
    @media (max-width: 600px) {
        max-width: 100%;
    }
`;

const Firstcontent = styled.div`
    flex-grow: 1;
    padding: 15px; /* Reduced padding */
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: 600px) {
        padding: 10px;
    }
`;

const Secondcontent = styled.div`
    flex-grow: 1;
    padding: 15px; /* Reduced padding */
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: 600px) {
        padding: 10px;
    }
`;

const StyledForm = styled.form`
    width: 100%;
    max-width: 600px;
    padding: 15px; /* Reduced padding */
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px; /* Reduced margin top */

    h3 {
        text-align: center;
    }

    .form_input {
        width: 100%;
        margin-bottom: 10px; /* Reduced margin bottom */

        label {
            display: block;
            margin-bottom: 5px;
        }

        input {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
        }
    }

    .btn {
        background-color: #4caf50;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
        text-align: center;

        &:hover {
            background-color: #45a049;
        }
    }
`;

export default Assign;
