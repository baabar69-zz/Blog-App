import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";


export default class UpdatePost extends Component {
  constructor() {
    super();
    this.state = {
      model: false,
      title: null,
      textContent: null,
      tags: null,
      updated:false
    };
  }

  update() {
    fetch("http://localhost:3000/api/v1/post/" + this.props.match.params.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((response) => {
      response.json().then((result) => {
        console.log(result);
      });
    });
    this.setState({updated :true});
  }
  render() {
    return (
      <div>
        <h1>Update Post</h1>
        <div>
          <br /> <br />
          <input
            onChange={(event) => {
              this.setState({ title: event.target.value });
            }}
            placeholder="Title"
          />{" "}
          <br /> <br />
          <input
            onChange={(event) => {
              this.setState({ textContent: event.target.value });
            }}
            placeholder="Text Content"
          />{" "}
          <br /> <br />
          <input
            onChange={(event) => {
              this.setState({ tags: event.target.value });
            }}
            placeholder="Tag"
          />{" "}
          <br /> <br />
          <Button
            onClick={() => {
              this.update();
            }}
            variant="primary"
          >
            Submit
          </Button>
          <br /> <br />
          {this.state.updated ? <Redirect to="/blogs"></Redirect> :<div />}
        </div>
      </div>
    );
  }
}
