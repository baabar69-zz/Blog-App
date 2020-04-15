import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

export default class Logout extends Component {
    render() {
        return (
            <div>
                {localStorage.clear()}
                <Redirect to="/login"></Redirect>
                {window.location.reload()}
            </div>
        )
    }
}
