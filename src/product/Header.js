import React from "react";
import "../cart/cart.css";

const ProductHeader = () => {
  return (
    <div className="product-item width-inherit product-header">
      <div>
        <input
          type="text"
          defaultValue="Product Id"
          id="id"
          readOnly
          disabled
        />
      </div>
      <div>
        <input
          type="text"
          defaultValue="Product Name"
          id="name"
          readOnly
          disabled
        />
      </div>
      <div>
        <input type="text" defaultValue="QTY" readOnly disabled />
      </div>
      <div>
        <input type="text" defaultValue="Unit Price" readOnly disabled />
      </div>
      <div>
        <input type="text" defaultValue="Total Price" readOnly disabled />
      </div>
      <div>
        <input type="text" defaultValue="Notes" readOnly disabled />
      </div>
    </div>
  );
};

export default ProductHeader;
