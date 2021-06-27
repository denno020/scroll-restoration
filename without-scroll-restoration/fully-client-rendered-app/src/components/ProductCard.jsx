import React from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { name, price, image } = props.product;

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <Link to="/pdp">
          <img className="product-card__image" src={image} alt={name} />
        </Link>
      </div>
      <div className="product-card__name">
        <Link to="/pdp">{name}</Link>
      </div>
      <div className="product-card__price">${price}</div>
      <div className="product-card__configurations">
        <div className="product-card__configuration configuration--red"></div>
        <div className="product-card__configuration configuration--white"></div>
        <div className="product-card__configuration configuration--blue"></div>
        <div className="product-card__configuration configuration--green"></div>
        <div className="product-card__configuration configuration--yellow"></div>
      </div>
      <div className="product-card__configurations">
        <div className="product-card__configuration">S</div>
        <div className="product-card__configuration">M</div>
        <div className="product-card__configuration">L</div>
        <div className="product-card__configuration">XL</div>
      </div>
      <div className="product-card__action">
        <button className="product-card__action--add">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
