import React from "react";
import { Link } from "react-router-dom";

export default function Top() {

  return (
    <Link to={"/home/chat"}><a>back</a></Link>
  );
}
