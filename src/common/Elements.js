import React from "react";

class TextBox extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props);
    this.state = { value: props.value };
  }

  onTextChangeEvent = event => {
    // console.log(text);

    this.setState({ value: event.target.value });
    this.props.onTextChange(this.state.value);
    //console.log("from app components ", video);
  };

  render() {
    // let textValue = this.props.value ? this.props.value : "";

    let textsize = this.props.size
      ? this.props.size === "small"
        ? 30
        : this.props.size === "large"
        ? 50
        : this.props.size === "default"
        ? 40
        : 40
      : 40;
    let textReadOnly = this.props.readOnly === "true" ? true : false;
    let textDisabled = this.props.disabled === "true" ? true : false;
    // let onTextChangeEvent = this.props.onTextChange
    //   ? this.props.onTextChange
    //   : "";
    let textId = this.props.id ? this.props.id : "text_id";
    let textClassName = this.props.className ? this.props.className : "";

    return (
      <input
        type="text"
        id={textId}
        value={this.state.value}
        className={`${textClassName}`}
        size={`${textsize}`}
        readOnly={textReadOnly}
        disabled={textDisabled}
        onChange={this.onTextChangeEvent}
      />
    );
  }
}

export default TextBox;

// class SearchBar extends React.Component {
//   state = { term: "" };
//   onInputChange = event => {
//     this.setState({ term: event.target.value });
//   };

//   onFormSubmit = event => {
//     event.preventDefault();
//     this.props.onFormSubmit(this.state.term);
//   };

//   render() {
//     return (
//       <div className="search-bar ui segment">
//         <form onSubmit={this.onFormSubmit} className="ui form">
//           <div className="field">
//             <label>Video Search</label>
//             <input
//               value={this.state.term}
//               onChange={this.onInputChange}
//               type="text"
//             />
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
