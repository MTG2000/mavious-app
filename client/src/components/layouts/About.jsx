import React, { useEffect } from "react";
import Carousel from "./Carousel.About";
const About = () => {
  useEffect(() => {
    document.title = "About Us";
  }, []);
  return (
    <main className="container mt-5 mb-6">
      <Carousel />
      <h2 className="text-primary mt-5 mb-5 h1" data-aos="flip-left">
        About Mavious
      </h2>
      <p
        className="px-4 text-dark mb-5 h3 text-justify"
        data-aos="fade-up"
        style={{ lineHeight: "38px" }}
      >
        Our Company is Considerd one of the oldest companys in our field of
        making & exporting cloths and we distinguised ourslfes from the others
        by setting a very high standards for everything we make . Our No.1
        concern is the trust of our customers & their good experince with us and
        we are doing very good on this regard.
      </p>
    </main>
  );
};

export default About;
