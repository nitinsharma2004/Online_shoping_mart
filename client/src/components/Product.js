import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";
import { useNavigate } from "react-router-dom";
const Product = (curElem) => {
  const { id, title, image, price, category } = curElem;
  const history = useNavigate();

  const callhome = async () => {
    try {
      const res = await fetch('/abc', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      if (res.status === 401) {
        const error = new Error(data.error);
        throw error;
      }
    } catch (e) {
      console.log("abc");
      history('/login');
    }
  }
  useEffect(() => {
    callhome();
  }, []);

  return (
    <NavLink to={`/singleproduct/${id}`}>
      <div className="card">
        <figure>
          <img src={image} alt={title} />
          <figcaption className="caption">{category}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{title}</h3>
            <p className="card-data--price">{<FormatPrice price={price} />}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
