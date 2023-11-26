import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({product ,id}) => {
  return( 
            <Link to={`/${id}`}>
              <div  className="cards">
                <img className="cards__img" src={product.images[0]} />
                <div className="cards__overlay">
                    <div className="card__title">{product.title}</div>
                </div>
              </div>
            </Link>
      )
};

export default Card;
