// this is the home page
import Carousel from "../components/Carousel";
import {slides} from "../data/carouselData.json"

function HomePage() {
  return (
    <>
      <h1>Welcome to ProTasker</h1>
      
      <Carousel data={slides} />

      <p>A Central Location For Managing All Your Projects</p>
    </>
  );
}

export default HomePage;
