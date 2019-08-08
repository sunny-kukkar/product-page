import React from "react";
import ProductItem from "./Item";
import ProductHeader from "./Header";
import "../cart/cart.css";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newRows: [], products: [], updatedRows: [] };
  }

  addProduct = () => {
    const newRows = this.state.newRows.length
      ? this.state.newRows[this.state.newRows.length - 1] + 1
      : 1;
    this.setState({ newRows: [...this.state.newRows, newRows] });
  };

  removeRow = id => {
    const newRow = id.toString().indexOf("newrow") > -1 ? true : false;
    if (newRow) {
      this.setState({
        newRows: this.state.newRows.filter(
          el => el.toString() !== id.replace("newrow", "")
        )
      });
    } else {
      const item = this.props.data.filter(
        (itm, idx) => id.toString() === idx.toString()
      );
      this.props.removeRow(id.toString());
      this.saveProduct(item, this.props.id, false);
    }
  };

  availableProducts = (id = 0) => {};

  saveProduct = (item = null, id, addEdit = true) => {
    this.updateSaveProducts(item, id, addEdit);
  };

  updateSaveProducts = (item, id, addEdit) => {
    debugger;
    if (item.id) {
      let updatedRows =
        this.state.updatedRows.length > this.props.data.length
          ? this.state.updatedRows
          : this.props.data;
      updatedRows = updatedRows.filter(itm => itm.id !== item.id);
      updatedRows = addEdit ? [...updatedRows, item] : updatedRows;
      this.setState({ updatedRows: updatedRows });
    }
  };

  handleSave = () => {
    debugger;
    const saveData =
      this.state.updatedRows.length >= this.props.data.length
        ? this.state.updatedRows
        : this.props.data;
    this.props.saveData(saveData);
  };

  componentDidMount = () => {
    // eslint-disable-next-line import/no-webpack-loader-syntax
    var data = require("./product.json");
    this.setState({ products: data.product });
  };

  //   componentDidUpdate = (prevProps, prevState, e) => {
  //     console.log(e);
  //     // if (prevProps.data === this.props.data && this.state.newRows.length) {
  //     //   this.setState({ newRows: [] });
  //     // }
  //   };

  componentWillReceiveProps = prevProps => {
    debugger;
    if (
      prevProps &&
      this.props.data &&
      prevProps.data.length >= this.props.data.length
    ) {
      this.setState({ newRows: [] });
    }
  };

  render() {
    const data = this.props.data;
    const { newRows, products } = this.state;
    return (
      <div className="product-list width-inherit">
        <ProductHeader />
        {data &&
          data.length &&
          this.state.products.length &&
          data.map((item, idx) => {
            return (
              <ProductItem
                key={idx}
                id={idx}
                item={item}
                products={products}
                saveProduct={(item, id) => this.saveProduct(item, id)}
                removeRow={idx => this.removeRow(idx)}
              />
            );
          })}
        {this.state.products.length &&
          newRows.map(item => {
            const uniqKey = "newrow" + item;
            return (
              <ProductItem
                key={uniqKey}
                id={uniqKey}
                products={products}
                saveProduct={(item, id) => this.saveProduct(item, id)}
                removeRow={uniqKey => this.removeRow(uniqKey)}
              />
            );
          })}
        <div className="product-button">
          <button className="action" onClick={this.addProduct}>
            ADD PRODUCT
          </button>
          <div>
            <button className="action" onClick={this.handleSave}>
              SAVE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
