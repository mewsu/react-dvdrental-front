import React from "react";
import ReactDOM from "react-dom";
import searchIcon from "../img/loupe.png";
// import sampleData from "./sample-data.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    // console.log(sampleData);
    this.state = { data: [], curPage: 1, maxPage: 1, filmSearchInput: "" };
  }

  componentDidMount() {
    console.log("mounted, fetching data");
    this.getFilmPage(1);
    this.getTotalPages();
  }

  onClickNextPage = () => {
    console.log("next page");
    const getPage = this.state.curPage + 1;
    this.getFilmPage(getPage);
  };

  onClickPreviousPage = () => {
    console.log("previous page");
    const getPage = this.state.curPage - 1;
    this.getFilmPage(getPage);
  };

  getTotalPages = () => {
    fetch(`http://localhost:3001/film/pages`)
      .then(res => res.json())
      .then(json => {
        console.log("response: ", json);
        this.setState({ maxPage: json });
      });
  };

  getFilmPage = page => {
    console.log("get page: ", page);
    fetch(`http://localhost:3001/film?page=${page}`)
      .then(res => res.json())
      .then(json => {
        console.log("response: ", json);
        this.setState({ data: json, curPage: page });
      });
  };

  onSearchChange = e => {
    this.setState({ filmSearchInput: e.target.value });
  };

  render() {
    const d = this.state.data;
    return (
      <div id="main">
        <div id="film-nav">
          <h1>Films</h1>
          <FilmSearch
            searchString={this.state.filmSearchInput}
            onSearchChange={this.onSearchChange}
          />
        </div>

        <div id="film-display-container">
          {d.length
            ? d.map((d, i) => {
                return (
                  <FilmDisplay
                    key={i}
                    title={d.title}
                    description={d.description}
                    length={d.length}
                    rating={d.rating}
                    releaseYear={d.release_year}
                    rentalRate={d.rental_rate}
                    specialFeatures={d.special_features}
                  />
                );
              })
            : "Please wait..."}

          <div></div>
        </div>

        <div id="page-nav">
          <button
            disabled={this.state.curPage == 1}
            onClick={this.onClickPreviousPage}
          >
            Previous Page
          </button>
          <button
            disabled={this.state.curPage == this.state.maxPage}
            onClick={this.onClickNextPage}
          >
            Next Page
          </button>
        </div>
      </div>
    );
  }
}

const FilmDisplay = props => {
  return (
    <div>
      <div className="film-display">
        <span className="film-title">{props.title}</span>
        <span className="film-desc">{props.description}</span>
        <span>
          <u>Length:</u> {props.length}m
        </span>
        <span>
          <u>Rating:</u> {props.rating}
        </span>
        <span>
          <u>Release Year:</u> {props.releaseYear}
        </span>
        <span>
          <u>Price:</u> {props.rentalRate}
        </span>
        <span>
          <u>Special Features:</u> {props.specialFeatures.join(", ")}
        </span>
      </div>
    </div>
  );
};

const FilmSearch = props => {
  return (
    <div id="film-search-container">
      <img alt="Search icon" src={searchIcon}></img>
      <input value={props.searchString} onChange={props.onSearchChange}></input>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
