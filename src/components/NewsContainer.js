import React, { Component } from "react";
import Spinner from "../Spinner";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";


export class NewsContainer extends Component {
  static defaultProps = {
    category: "general",
    pageSize: 15,
    country: "in",
  };
  static propTypes = {
    category: PropTypes.string,
    pageSize: PropTypes.number,
    country: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      toparticles: [],
      page: 1,
      totalResult: 0,
      NumberOfPages: 0,
      loading: true,
    };
    document.title=`FavNews - ${this.capitalizeFirstLetter(this.props.category)}`
  }
  updateNews = (url) => {
    fetch(url)
      .then((res) => {
        this.props.setProgress(30);
        return res.json();
      })
      .then((data) => {
        this.props.setProgress(50);
        this.setState({ articles: data["articles"], loading: false });
        this.props.setProgress(100);
      });
      
  }
  handelPrev = () => {
    this.props.setProgress(10);
    this.setState({ loading: true, page: this.state.page - 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=318229509c7b45cdbeaafe8d6d405185&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.updateNews(url);
  };
  handelNext = () => {
    this.props.setProgress(10);
    this.setState({ loading: true, page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=318229509c7b45cdbeaafe8d6d405185&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.updateNews(url);
  };
  componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=318229509c7b45cdbeaafe8d6d405185&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    fetch(url)
      .then((res) => {
        this.props.setProgress(30);
        return res.json();
      })
      .then((data) => {
        this.props.setProgress(50);
        this.setState({
          totalResult: data["totalResults"],
          NumberOfPages: Math.ceil(data["totalResults"] / this.props.pageSize),
        });
        let a = data["articles"];
        this.setState({ articles: a.splice(3), loading: false });
        this.setState({ toparticles: a.splice(0, 3) });
        this.props.setProgress(100);
        setTimeout(() => {
          let b = document.getElementsByClassName("carousel-item");
          b[0].classList.add("active");
        }, 500);
      });
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  render() {
    return (
      <div className="container" style={{marginTop:"4rem"}}>
        <div>
          <div
            id="carouselExampleCaptions"
            className="carousel slide"
            data-bs-ride="false"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              {this.state.toparticles.map((element) => {
                if (!element.urlToImage) {
                  return <div></div>;
                }
                return (
                  <div className="carousel-item " key={element.url}>
                    <img
                      src={
                        element.urlToImage
                          ? element.urlToImage
                          : "img/rough.png"
                      }
                      className="d-block w-100"
                      style={{ height: "300px" }}
                      alt="..."
                    />
                    <div className="carousel-caption">
                      <h1 className="text-start" id="carousel-text">
                        {element.title
                          ? element.title
                          : "Title not available because there is any Issue with This Post"}
                      </h1>
                      <p className="text-start">
                        <a href={element.url}>Read More</a>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
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
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <h1 className="text-center my-2">
            Top Headlines News Today-
            {this.capitalizeFirstLetter(this.props.category)}
          </h1>
        </div>
        <div className="my-6">{this.state.loading && <Spinner />}</div>
        {!this.state.loading &&
          this.state.articles.map((element) => {
            return (
              <NewsItem
                newsUrl={element.url}
                key={element.url}
                title={
                  element.title
                    ? element.title
                    : "Title not available because there is any Issue with This Post"
                }
                description={
                  element.description
                    ? element.description
                    : "Description not available"
                }
                imgUrl={
                  element.urlToImage ? element.urlToImage : "img/rough.png"
                }
                publish={element.publishedAt}
              />
            );
          })}
        <nav aria-label="">
          <ul className="pagination" id="el">
            <li className="page-item">
              <button
                disabled={this.state.page <= 1}
                className="page-link bg-primary text-light "
                onClick={this.handelPrev}
              >
                Previous
              </button>
            </li>
            <li className="page-item">
              <button
                disabled={this.state.page >= this.state.NumberOfPages}
                className="page-link"
                onClick={this.handelNext}
              >
                Next
              </button>
            </li>
            <li className="page-item">
              <p className="page-link text-dark">
                Pages :{this.state.page} - {this.state.NumberOfPages}
              </p>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NewsContainer;
