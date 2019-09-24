import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";

export default class DemoCarousel extends Component {
  render() {
    return (
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        showThumbs={false}
        showStatus={false}
        interval={5000}
        stopOnHover={false}
        className="my-5"
      >
        <div>
          <img
            src="https://www.abc.net.au/news/image/4754534-3x2-940x627.jpg"
            alt="Sewing Factory"
          />
          <p className="legend d-none d-lg-block  font-weight-bold">
            Our Main Factory is located in the USA
          </p>
        </div>

        <div>
          <img
            src="https://i.ytimg.com/vi/ue6MhsAIBD4/maxresdefault.jpg"
            alt="Sewing Factory"
          />
          <p className="legend d-none d-lg-block  font-weight-bold ">
            More than 1000 workers to satisfy the need of the market
          </p>
        </div>
        <div>
          <img
            src="https://cdn7.dissolve.com/p/D943_234_471/D943_234_471_1200.jpg"
            alt="Sewing Factory"
          />
          <p className="legend d-none d-lg-block  font-weight-bold">
            Advanced technologies for the best & fastest possible
          </p>
        </div>
      </Carousel>
    );
  }
}
