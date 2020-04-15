import React, { Component } from "react";
import { Alert } from "react-bootstrap";

export default class SuccessModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: props.model,
    };
  }
  render() {
    return (
      <div>
        {this.state.model ? (
          ["success"].map((variant, idx) => (
            <Alert
              style={{ width: 200.0, display: "inline-block" }}
              key={idx}
              variant={variant}
            >
              {variant}
            </Alert>
          ))
        ) : (
          <div />
        )}
      </div>
    );
  }
}
