import React, { Component } from "react";

class CarouselLeftArrow extends Component {
  render() {
    return (
      <div
        className="carousel__arrow carousel__arrow--left w-12 h-12 rounded-full flex items-center justify-center cursor-pointer bg-purple-700"
        onClick={this.props.onClick}
      >
        <img className="w-8 h-8" src="/images/landing/arrow.svg" />
      </div>
    );
  }
}

class CarouselRightArrow extends Component {
  render() {
    return (
      <div
        className="carousel__arrow carousel__arrow--right w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center cursor-pointer"
        onClick={this.props.onClick}
      >
        <img className="w-8 h-8" src="/images/landing/arrow.svg" />
      </div>
    );
  }
}

class CarouselIndicator extends Component {
  render() {
    return (
      <li>
        <a
          className={
            this.props.index == this.props.activeIndex
              ? `carousel__indicator carousel__indicator--active`
              : `carousel__indicator`
          }
          onClick={this.props.onClick}
        />
      </li>
    );
  }
}

class CarouselSlide extends Component {
  render() {
    const { type, slide } = this.props;
    const renderImage = () => {
      if (type === `product`) {
        return (
          <div
            className="mx-auto carousel__slide__item"
            style={{
              backgroundImage: `url(${slide})`,
              backgroundPosition: `center`,
              backgroundSize: `cover`,
              backgroundRepeat: `no-repeat`,
            }}
          />
        );
      }
      return <img className="mx-auto" src={slide.img} />;
    };
    return (
      <li
        className={
          this.props.index == this.props.activeIndex
            ? `carousel__slide carousel__slide--active`
            : `carousel__slide`
        }
      >
        {renderImage()}
        <div className="font-semibold text-xl text-white mt-8">
          {this.props.slide.title}
        </div>
        <div className="text-white mx-auto w-full">{this.props.slide.desc}</div>
      </li>
    );
  }
}

// Carousel wrapper component
export default class Carousel extends Component {
  constructor(props) {
    super(props);

    this.goToSlide = this.goToSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);

    this.state = {
      activeIndex: 0,
    };
  }

  goToSlide(index) {
    this.setState({
      activeIndex: index,
    });
  }

  goToPrevSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    this.setState({
      activeIndex: index,
    });
  }

  goToNextSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    ++index;

    this.setState({
      activeIndex: index,
    });
  }

  render() {
    return (
      <div className={`carousel ${this.props.className}`}>
        <CarouselLeftArrow
          onClick={(e) => this.goToPrevSlide(e)}
          type={this.props.type}
        />

        <ul className="carousel__slides">
          {this.props.slides.map((slide, index) => (
            <CarouselSlide
              activeIndex={this.state.activeIndex}
              index={index}
              key={index}
              slide={slide}
              type={this.props.type}
            />
          ))}
        </ul>

        <CarouselRightArrow
          onClick={(e) => this.goToNextSlide(e)}
          type={this.props.type}
        />

        <ul className="carousel__indicators">
          {this.props.slides.map((slide, index) => (
            <CarouselIndicator
              activeIndex={this.state.activeIndex}
              index={index}
              isActive={this.state.activeIndex == index}
              key={index}
              onClick={(e) => this.goToSlide(index)}
            />
          ))}
        </ul>

        <style global jsx>
          {`
            ul {
              padding: 0;
              margin: 0;
              list-style-type: none;
            }

            .carousel-container {
              display: -webkit-box;
              display: flex;
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              flex-direction: column;
              -webkit-box-pack: center;
              justify-content: center;
              min-height: 210px;
            }

            .carousel {
              position: relative;
            }

            .carousel__slide {
              margin-right: auto;
              margin-left: auto;
              display: none;
              max-width: 900px;
              list-style-type: none;
              text-align: center;
            }
            .product__carousel {
              height: 100%;
            }

            .product__carousel {
              height: 100%;
            }

            .product__carousel ul {
              height: 100%;
            }
            .product__carousel li {
              height: 100%;
            }

            .carousel__slide__item {
              height: 100%;
              width: 100%;
            }
            @media (max-width: 991px) {
              .carousel__slide {
                padding-right: 60px;
                padding-left: 60px;
              }
            }
            .carousel__slide--active {
              display: block;
            }

            .carousel-slide img {
              width: 280px;
            }

            .carousel-slide__author,
            .carousel-slide__source {
              font-family: "Roboto", arial, sans-serif;
              font-size: 14px;
            }
            @media (min-width: 992px) {
              .carousel-slide__author,
              .carousel-slide__source {
                font-size: 16px;
              }
            }

            .carousel-slide__source {
              font-style: italic;
              color: #888;
            }

            .carousel__arrow {
              position: absolute;
              top: 50%;
              color: #111;
              -webkit-transform: translateY(-50%);
              transform: translateY(-50%);
              -webkit-transition: opacity 0.15s cubic-bezier(0.4, 0, 1, 1);
              transition: opacity 0.15s cubic-bezier(0.4, 0, 1, 1);
              opacity: 0.45;
            }
            .carousel__arrow:focus {
              outline: 0;
            }
            .carousel__arrow:hover {
              opacity: 0.8;
            }
            .carousel__arrow--left {
              left: 0;
            }
            .carousel__arrow--right {
              right: 0;
            }

            .product__carousel .carousel__arrow--right {
              right: 16px;
            }

            .product__carousel .carousel__arrow--left {
              left: 16px;
            }

            .carousel__arrow--right img {
              transform: rotate(180deg);
            }

            .carousel__indicators {
              display: flex;
              flex-direction: row;
              justify-content: center;
              margin-top: 20px;
            }
            .product__carousel .carousel__indicators {
              position: absolute;
              bottom: 16px;
              left: 50%;
              transform: translateX(-50%);
              z-index: 1;
              height: initial;
            }
            .carousel__indicators li:nth-of-type(n + 2) {
              margin-left: 9px;
            }

            .carousel__indicator {
              display: block;
              width: 8px;
              height: 8px;
              background-color: white;
              cursor: pointer;
              opacity: 0.5;
              border-radius: 50%;
              -webkit-transition: opacity 0.15s cubic-bezier(0.4, 0, 1, 1);
              transition: opacity 0.15s cubic-bezier(0.4, 0, 1, 1);
            }
            .carousel__indicator:hover {
              opacity: 0.5;
            }
            .carousel__indicator--active,
            .carousel__indicator--active:hover {
              opacity: 1;
              width: 28px;
              border-radius: 4px;
            }
          `}
        </style>
      </div>
    );
  }
}
