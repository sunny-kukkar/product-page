import React from "react";
import UserAddress from "../user/Address";
import ProductList from "../product/List";
import "./cart.css";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      billingAddress: {
        firstName: "",
        LastName: "",
        address1: "",
        address2: "",
        city: "",
        stateName: "",
        zip: "",
        country: "",
        dateValue: Date.now()
      },
      deliveryAddress: {
        firstName: "",
        LastName: "",
        address1: "",
        address2: "",
        city: "",
        stateName: "",
        zip: "",
        country: "",
        dateValue: Date.now()
      }
    };
  }

  removeRow = id => {
    this.setState({
      data: this.state.data.filter(
        (el, idx) => idx.toString() !== id.toString()
      )
    });
  };

  saveData = data => {
    console.log("updateJSON", data);
    this.setState({ data: data });
  };

  componentDidMount = () => {
    // eslint-disable-next-line import/no-webpack-loader-syntax
    var data = require("./cart.json");
    this.setState({
      data: data.data.product,
      billingAddress: data.data.billingAddress,
      deliveryAddress: data.data.deliveryAddress
    });
  };

  render() {
    const { data, billingAddress, deliveryAddress } = this.state;
    return (
      <div className="cart">
        <div className="address width-inherit">
          <UserAddress addressType="billing" address={billingAddress} />
          <UserAddress address={deliveryAddress} />
        </div>
        <ProductList
          data={data}
          removeRow={id => this.removeRow(id)}
          saveData={this.saveData}
        />
      </div>
    );
  }
}

export default Cart;
