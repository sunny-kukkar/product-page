import React from "react";

class UserAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataVal: null };
  }
  getDate = epocmilisec => {
    var today = new Date(epocmilisec);

    const dateValue =
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);
    return dateValue;
  };

  render() {
    const addressType =
      this.props.addressType === "billing" ? "Billing" : "Shipping";
    const address = this.props.address;
    const dateType =
      addressType === "Billing" ? "Order Date" : "Expected Delivery";
    return (
      <div>
        <div>{addressType} Address</div>
        <input
          type="text"
          placeholder="First Name"
          defaultValue={address.firstName}
          readOnly
        />
        <input
          type="text"
          placeholder="Last Name"
          defaultValue={address.LastName}
          readOnly
        />
        <input
          type="text"
          placeholder="Last Name"
          defaultValue={address.address1}
          readOnly
        />
        <input
          type="text"
          placeholder="Last Name"
          defaultValue={address.address2}
          readOnly
        />
        <input
          type="text"
          placeholder="Last Name"
          defaultValue={address.city}
          readOnly
        />
        <input
          type="text"
          placeholder="Last Name"
          defaultValue={address.stateName}
          readOnly
        />
        <input type="text" placeholder="Last Name" defaultValue={address.zip} />
        <input
          type="text"
          placeholder="Last Name"
          defaultValue={address.country}
          readOnly
        />
        <div>{dateType}</div>
        <input
          type="date"
          placeholder="Last Name"
          value={this.getDate(address.dateValue)}
          onChange={() => {}}
        />
      </div>
    );
  }
}

export default UserAddress;
