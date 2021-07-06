import React from "react";
import Notice from "../../components/Notice/Notice";
import Virus from "../../components/Virus/Virus";
import DepartmentNotice from "../../components/DepartmentNotice/DepartmentNotice";
import CountDown from "../../components/CountDown/CountDown";
function FirstPage(){
    return (
    <div className="main">
    <article className="Main__container__upper">
      <section className="Main__dday">
        <CountDown/>
      </section>
      <section className="main-virus">
        <Virus/>
      </section>
    </article>
    <article className="Main__container__lower">
      <section className="Main__schedule">
          <DepartmentNotice/>
      </section>
      <section className="Main__notice">
        <Notice></Notice>
      </section>
    </article>
</div>
)  
}

export default FirstPage