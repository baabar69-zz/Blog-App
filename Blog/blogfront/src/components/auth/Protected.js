import React from "react";
import { Redirect } from "react-router-dom";

function Protected(props) {
  const token = localStorage.getItem("token");
  const Comp = props.cmp;
  console.log(token);
  return <div>{token ? <Comp /> : <Redirect to="/login"></Redirect>}</div>;
}
export default Protected;
