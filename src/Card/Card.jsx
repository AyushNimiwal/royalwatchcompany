import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({product ,id}) => {
  return( 
            <Link to={`/${id}`}>
              <div  className="cards rounded-md">
                <img className="cards__img rounded-t-md" src={product.images[0]} />
                <div className="flex justify-between items-center px-3 bg-black/5 rounded-b-md">
                  <div className="card__title text-slate-500 ">{product.title}</div>
                  <div className=" text-slate-500 ">₹ {product.price}</div>
                </div>
              </div>
            </Link>
      )
};

export default Card;
