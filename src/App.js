import React, { Fragment, Component } from "react";
import axios from 'axios';

import "./App.css";
import Banner from "./components/banner/banner.component";
import SearchBox from "./components/search-box/search-box.component";
import Card from "./components/card/card.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: "",
      userData: "",
      repoData: [],
    };
  }

  onInputChange = (event) => {
    this.setState({ searchName: event.target.value }, () => {
      this.getData(this.state.searchName);
      this.getRepo(this.state.searchName);
    });
  };
  getRepo(userName) {
    axios.get(`https://api.github.com/users/${userName}/repos`)
      .then((res) => {
        this.setState({ repoData: res.data });

      })
  }
  getData = (userName) => {
    fetch(`https://api.github.com/users/${userName}`)
      .then((res) => res.json())
      .then((data) => this.setState({ userData: data }))
         .catch((error) => {
          alert("Oops! Could not reach GitHub");
          console.log("Oops! We have an error", error);
        });
  };

  render() {
    console.log(this.state.repoData)
    return (
      <Fragment>
        <Banner />
        <SearchBox onInputChange={this.onInputChange} />
        {this.state.userData.id && this.state.searchName !== "" ? (
          <Card profile={this.state.userData} />
        ) : (
          <div className="no-data">
            No user Found! <br />
          </div>
        )}
      </Fragment>
    );
  }
}

export default App;
