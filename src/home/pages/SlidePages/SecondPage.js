import axios from "axios";
import { useState, useEffect } from "react";
import address from "../../../address-info";
import "./SecondPage.scss";

function SecondPage() {
  const [newsContent, setNewsContent] = useState([]);

  useEffect(() => {
    axios.get(address.url + "/api/kaunews").then((response) => {
      let div = document.createElement("div");
      div.innerHTML = response.data.result;
      let contentData = div.querySelector("#resultBody");
      let titles = Array.from(
        contentData.querySelectorAll("tr td:nth-child(2)")
      ).slice(0, 3);
      const newsList = [];
      Array.from(contentData.querySelectorAll("tr td:nth-child(4)"))
        .slice(0, 3)
        .map((elem, index) => {
          newsList.push({
            src: elem
              .querySelector("p img")
              .src.replace("localhost:3000", "old.kau.ac.kr").replace("file://", "http://old.kau.ac.kr"),
            content: elem.querySelector("p").innerText,
            title: titles[index].innerText,
          });
          console.log(elem
            .querySelector("p img")
            .src.replace("localhost:3000", "old.kau.ac.kr"))
        });
      setNewsContent(newsList);
    });
  }, []);
  return (
    <div className="card-container">
      {newsContent.map((elem, idx) => {
        return (
          <div className="card" key={idx}>
            <div className="card-top">
              <a href="">
                <img src={elem["src"]} alt="alt" />
              </a>
            </div>
            <div className="card-content">
              <h6 className="tag">KAU</h6>
              <a href="">
                <div className="title">
                  {elem["title"].length < 22
                    ? elem["title"]
                    : `${elem["title"].slice(0, 22)}...`}
                </div>
              </a>
              <p>
                {elem["content"].length < 70
                  ? elem["content"]
                  : `${elem["content"].slice(0, 70)}...`}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SecondPage;
