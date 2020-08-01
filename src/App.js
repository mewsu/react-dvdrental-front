import React from "react";
import ReactDOM from "react-dom";

// import sampleData from "./sample-data.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    // console.log(sampleData);
    this.state = { data: [] };
  }

  componentDidMount() {
    console.log("mounted, fetching data");
    fetch("http://localhost:3001/film?page=1")
      .then(res => res.json())
      .then(json => {
        console.log("response: ", json);
        this.setState({ data: json });
      });
  }

  render() {
    const d = this.state.data;
    return (
      <div>
        <h1>Films</h1>
        <div className="main">
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
      </div>
    );
  }
}

const FilmDisplay = props => {
  return (
    <div>
      <div className="film-display">
        <span>
          <u>Title</u>: {props.title}
        </span>
        <span>
          <u>Description:</u> {props.description}
        </span>
        <span>
          <u>Length:</u> {props.length}
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

const StatelessComponent = props => {
  return <header>{props.title}</header>;
};

ReactDOM.render(<App />, document.getElementById("root"));
