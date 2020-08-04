import React from "react";
import searchIcon from "../img/loupe.png";

export default class FilmPage extends React.Component {
  constructor(props) {
    super(props);
    // console.log(sampleData);
    this.state = {
      data: [],
      curPage: 1,
      maxPage: 1,
      filmSearchInput: "",
      showNoResults: false
    };
  }

  componentDidMount() {
    console.log("film page mounted, fetching data");
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

  onSearchEnter = () => {
    const searchString = this.state.filmSearchInput;
    console.log("search: ", searchString);
    fetch(`http://localhost:3001/film/search?title=${searchString}`)
      .then(res => res.json())
      .then(json => {
        console.log("response: ", json);
        if (!json.length) this.setState({ showNoResults: true });
        this.setState({ data: json, curPage: 1 });
      });
  };

  render() {
    let d = this.state.data;
    if (d.length > 8) d = d.slice(0, 8);
    return (
      <div id="film-main">
        <div id="film-nav">
          <h1>Films</h1>
          <FilmSearch
            searchString={this.state.filmSearchInput}
            onSearchChange={this.onSearchChange}
            onSearchEnter={this.onSearchEnter}
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
            : this.state.showNoResults
            ? "No results found."
            : "Please wait..."}

          <div></div>
        </div>

        <div id="page-nav">
          <button
            className="nav-button"
            disabled={this.state.curPage == 1}
            onClick={this.onClickPreviousPage}
          >
            Previous Page
          </button>
          <button
            className="nav-button"
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
      <button onClick={props.onSearchEnter}>
        <img alt="Search icon" src={searchIcon}></img>
      </button>

      <input value={props.searchString} onChange={props.onSearchChange}></input>
    </div>
  );
};
