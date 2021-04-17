import { useEffect, useState } from "react";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import "./Home.css"

function Home() {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  useEffect(() => {
    setBackgroundIndex(Math.floor((Math.random() * 100) % 16) + 1);
  }, []);
  const styles = {
    background: {
      backgroundImage: `url(./background/background${backgroundIndex}.jpg)`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
  };
  return (
    <div className="Home" style={styles.background}>
        <Main></Main>
        <Footer></Footer>
    </div>
  );
}

export default Home;
