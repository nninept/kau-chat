import { useEffect, useState } from "react";
import "./Home.scss";
import React from "react";
import PopUp from '../components/PopUp/PopUp'
import Carousel from 'react-material-ui-carousel'
import FirstPage from "./SlidePages/FirstPage"
import SecondPage from "./SlidePages/SecondPage"
import address from "../../address-info"
import axios from "axios";
const Home = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [contents, setContents] = useState(null);
  useEffect(() => {
    setBackgroundIndex(Math.floor((Math.random() * 100) % 16) + 1);
  }, []);
  useEffect(()=>{
    axios.get(address.url + '/api/kauboard/notices')
    .then(res => setContents(res.data.result))
},[])
  const styles = {
    background: {
      backgroundImage: `url(./background/background${backgroundIndex}.jpg)`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
  };
  return (
    <div className="home" style={styles.background}>
      {contents ? (
        contents.map((elem, idx) => {
          return <PopUp content={elem} idx={idx} key={idx} />;
        })
      ) : (
        <></>
      )}
      <Carousel interval={15000} autoPlay={false}>
        <FirstPage />
        <SecondPage />
      </Carousel>
    </div>
  );
};

export default Home;
