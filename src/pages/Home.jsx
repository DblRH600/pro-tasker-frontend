// this is the home page
import Carousel from "../components/Carousel";
import { slides } from "../data/carouselData.json";

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-page-header">
        <h1 className="home-header">Welcome ProTasker</h1>
      </div>

      <Carousel data={slides} />

      <div className="home-text-container">
        <p className="home-text">
          A Central Location For Managing All Your Projects
        </p>
      </div>
    </div>
  );
}

export default HomePage;
