import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name:"",
      email: "",
      password: "",
      isRegister: false,
      role:'',
      isLoggedIn:false,
      isReg:false

    };
  }
 async login() {
   await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((result) => {
      result.json().then((res) => {
        localStorage.setItem("token", JSON.stringify(res.token));
        
      });
    });
    this.setState({isLoggedIn:true})
  }
 async register(){
    await fetch("http://localhost:3000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((result) => {
      result.json().then((res) => {
        localStorage.setItem("token", JSON.stringify(res.token));
      });
    });
    this.setState({isReg:true})

  }
  render() {
    return (
     <div>
       {!this.state.isRegister?  <div>
        <br />
        <br />
        <h1>Please enter credentials to Login</h1>
        <br />
        <br />
        <input
          type="text"
          name="user"
          placeholder="email"
          onChange={(event) => this.setState({ email: event.target.value })}
        />{" "}
        <br />
        <br />
        <input
          type="password"
          name="password "
          placeholder="password"
          onChange={(event) => this.setState({ password: event.target.value })}
        />{" "}
        <br />
        <br />
        <Button
          onClick={() => {
            this.login();
          }}
          variant="primary"
        >
          LogIn
        </Button>
        <Button style={{ marginLeft: 10 }}
          onClick={() => {
           this.setState({isRegister:true})
          }}
          variant="primary"
        >
          Go to Register
        </Button>
        {this.state.isLoggedIn ? <Redirect to="/blogs"></Redirect>: <div />}
      </div>
      :
      
      <div>
       <br />
        <br />
        <h1>Please enter credentials to Register</h1>
        <br />
        <br />
        <input
          type="text"
          name="user"
          placeholder="name"
          onChange={(event) => this.setState({ name: event.target.value })}
        />{" "}
        <br />
        <br />
        
        <input
          type="text"
          name="user"
          placeholder="email"
          onChange={(event) => this.setState({ email: event.target.value })}
        />{" "}
        <br />
        <br />
    
        <input
          type="password"
          name="password "
          placeholder="password"
          onChange={(event) => this.setState({ password: event.target.value })}
        />{" "}
        <br />
        <br />
        <input
          type="text"
          name="user"
          placeholder="Role(author / reader)"
          onChange={(event) => this.setState({ role: event.target.value })}
        />{" "}
        <br />
        <br />
        <Button
          onClick={() => {
            this.register();
          }}
          variant="primary"
        >
          Register
        </Button>
        <Button style={{ marginLeft: 10 }}
          onClick={() => {
           this.setState({isRegister:false})
          }}
          variant="primary"
        >
          Go to Login
        </Button>
        {this.state.isReg ? <Redirect to="/blogs"></Redirect>: <div />}
       </div>
}
     
       

     </div>
    );
  }
}
