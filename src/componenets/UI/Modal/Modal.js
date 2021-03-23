import React, { Component } from "react";
import classes from "./Modal.module.css";

class Modal extends Component {
  //MODAL Will be rendered only the props.show return true for performance improvement.
  // This will be converted to functional component
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  componentDidUpdate() {
    console.log("MODAL WILLUPDATE");
  }

  render() {
    return (
      <>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;
