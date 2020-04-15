import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: false,
      title: null,
      textContent: null,
      tags: null,
      selectedFile:null
    };
  }
  async photoUpload(id){
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      }
  };
  const formData = new FormData();
  formData.append('file',this.state.selectedFile);
  axios.put(`http://localhost:3000/api/v1/post/${id}/photo`,formData,config)
  .then((response) => {
      alert("The file is successfully uploaded");
  }).catch((error) => {
    console.log(error);
});
  }
  
  async create() {
    this.setState({ model: true });
    const token = JSON.parse(localStorage.getItem("token"));
    var bearer = "Bearer " + token;
    let id;
    await fetch("http://localhost:3000/api/v1/post", {
      method: "POST",
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Authorization": bearer,
      },
      body: JSON.stringify(this.state),
    }).then((response) => {
      response.json().then((result) => {
        id= result.data._id
        console.log(result.data._id);
        this.photoUpload(id);
      });
    });

  }
  fileSelectedHandler= event=>{
    this.setState({selectedFile:event.target.files[0]})
    console.log(event.target.files[0])
  }
  render() {
    return (
      <div>
        <h1>Create your post</h1>
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
          <input type="file" onChange= {this.fileSelectedHandler}/>
          
          <Button
            onClick={async () => {
               await this.create();
            }}
            variant="primary"
          >
            Add Post
          </Button>
          <br /> <br />
         
        </div>
      
        {this.state.model ? (
          ["success"].map((variant, idx) => (
            <div>
            <Alert
              style={{ width: 200.0, display: "inline-block" }}
              key={idx}
              variant={variant}
            >
              {variant}
            </Alert>
            <Redirect to="/blogs"></Redirect>
            </div>
          ))
        ) : (
          <div />
        )}

        
      </div>

    );
  }
}
