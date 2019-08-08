import React from "react";
import "../cart/cart.css";

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      id: 0,
      name: "",
      quantity: 0,
      unitPrice: 0,
      totalPrice: 0,
      notes: ""
    };
    this.loading = true;
  }
  handleDelete = () => {
    this.props.removeRow(this.props.id);
  };
  addOrEditProduct = (id = 0) => {
    let items = [];
    items.push(
      <option key="-1" value="-1">
        --select--
      </option>
    );
    if (!this.props.products) return items;
    for (let product of this.props.products) {
      if (product.id === id) {
        items.push(
          <option key={product.id} value={product.id}>
            {product.id}
          </option>
        );
      } else {
        items.push(
          <option key={product.id} value={product.id}>
            {product.id}
          </option>
        );
      }
    }
    return items;
  };
  calcTotalPrice = (quantity = 0, unitPrice = 0) => {
    return quantity * unitPrice;
  };

  productInfo = (triggeredEvent = "", id = null, quantity = 0, notes = "") => {
    let info = {
      id: 0,
      name: "",
      unitPrice: 0,
      totalPrice: 0,
      quantity: 0,
      notes: notes
    };

    if (id && this.props.products.length) {
      let infoArray = this.props.products.filter(item => {
        return item.id.toString() === id.toString();
      })[0];
      info.id = id ? id : 0;
      info.name = infoArray.name;
      info.unitPrice = infoArray.unitPrice;
      info.quantity =
        triggeredEvent === "onProductChange"
          ? 0
          : triggeredEvent === "onQuantityChange"
          ? quantity
          : this.props.item.quantity;
      info.notes =
        triggeredEvent === "onProductChange"
          ? ""
          : triggeredEvent === "onNotesChange"
          ? notes
          : this.props.item.notes;
      info.totalPrice = this.calcTotalPrice(info.quantity, infoArray.unitPrice);
    }

    this.setState(
      {
        id: info.id,
        name: info.name,
        unitPrice: info.unitPrice,
        totalPrice: info.totalPrice,
        quantity: info.quantity,
        notes: info.notes,
        item: this.props.item
      },
      triggeredEvent => {
        const productCart = {
          id: info.id ? parseInt(info.id) : info.id,
          quantity: info.quantity,
          notes: info.notes
        };
        if (!this.loading) {
          debugger;
          this.props.saveProduct(productCart, this.props.id);
        }
      }
    );
  };

  handleQuantityChange = e => {
    const quantity = parseInt(e.target.value);
    const totalPrice = quantity * this.state.unitPrice;
    this.setState(
      {
        quantity: quantity,
        totalPrice: totalPrice
      },
      () => {
        this.loading = false;
        this.productInfo("onQuantityChange", this.state.id, quantity);
      }
    );
  };

  handleNotesChange = e => {
    const notes = e.target.value;
    this.loading = false;
    this.productInfo("onNotesChange", this.state.id, 0, notes);
  };

  handleProductChange = e => {
    const id = e.target.options[e.target.selectedIndex].value;
    if (id !== "-1") {
      this.loading = false;
      this.productInfo("onProductChange", id);
    }
  };
  componentDidMount = () => {
    this.productInfo("initialize", this.props.item.id);
  };
  componentDidUpdate = prevProps => {
    if (prevProps.item !== this.props.item) {
      this.productInfo("initialize", this.props.item.id);
    }
  };

  render() {
    const { name, unitPrice, totalPrice, quantity, id, notes } = this.state;
    const productIds = this.addOrEditProduct(id);

    return (
      <div className="product-item width-inherit">
        <div>
          <select
            value={id}
            className="width-inherit"
            onChange={this.handleProductChange}
          >
            {productIds}
          </select>
        </div>
        <div>
          <input type="text" defaultValue={name} id="name" readOnly />
        </div>
        <div>
          <input
            type="text"
            value={quantity}
            onChange={this.handleQuantityChange}
          />
        </div>
        <div>
          <input type="text" value={unitPrice} readOnly />
        </div>
        <div>
          <input type="text" value={totalPrice} readOnly />
        </div>
        <div>
          <textarea value={notes} onChange={this.handleNotesChange} />
        </div>
        <button className="delete" onClick={this.handleDelete}>
          DELETE
        </button>
      </div>
    );
  }
}

ProductItem.defaultProps = {
  item: {
    id: "",
    name: "",
    quantity: 0,
    unitPrice: 0,
    notes: ""
  }
};

export default ProductItem;
