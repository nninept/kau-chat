import React from "react";
import {Link} from "react-router-dom"
import "./IconLink.scss";

const {ipcRenderer} = window.require('electron')
/*
Links 안에서 사용할 링크 ㅋ
*/

function IconLink({link, src, alt, title}) {
  let npotal = false
  if (link==="npotal") npotal = true  
  
  const openPotal = ()=>{
    ipcRenderer.invoke('open-npotal')
  }

  return (
    <div className="IconLink">
      {(npotal) ? <a onClick={openPotal}>
        <li className="IconLink__content">
          <img src={src} alt={alt} />
          <div>{title}</div>
        </li>
      </a> : 
      <Link to={link}>
        <li className="IconLink__content">
          <img src={src} alt={alt} />
          <div>{title}</div>
        </li>
      </Link> }
    </div>
  );
}

export default IconLink;
