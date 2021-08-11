import React from "react";
// const img1=require('./images/Why-Use-React-Native-For-Your-Business-in-2020.jpg')
import img1 from "./images/Why-Use-React-Native-For-Your-Business-in-2020.jpg";
import img2 from "./images/Is-it-okay-to-build-sites-that-rely-on-JavaScript-.jpg";
import img3 from "./images/wp5070716.jpg";
export default function Home() {
  return (
    <div className="">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner ">
          <div className="carousel-item active">
            <img src={img1} className=" homeImg " alt="1" />
          </div>
          <div className="carousel-item ">
            <img src={img2} className=" homeImg " alt="2" />
          </div>
          <div className="carousel-item">
            <img src={img3} className="  homeImg " alt="3" />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
