import React from "react";
import "./IconLink.scss";

const {ipcRenderer} = window.require('electron')
/*
Links 안에서 사용할 링크 ㅋ
*/

function IconLink(props) {

  const linkHandler = ()=>{
    if(props.pageNum === 0 || props.pageNum === 1) props.onLinkClicked(props.pageNum)
    else if (props.pageNum === 2) ipcRenderer.invoke('open-npotal')
  }

  return (
    <div className="IconLink">
      <a onClick={linkHandler}>
        <li className="IconLink__content">
          <img src={props.src} alt={props.alt} />
          <div>{props.title}</div>
        </li>
      </a>
    </div>
  );
}

export default IconLink;
