import React, { Component } from 'react';
import BeerCard from './BeerCard';
import './App.css';
const axios = require('axios');

class App extends Component {
  state = {
    data: [],
    searchText: ''
  }

  componentDidMount() {
    axios.get('https://api.punkapi.com/v2/beers').then((response) => {this.setState({data: response.data})});
  }

  handleSortByName = () => {
    const sorted = this.state.data.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    })
    this.setState({data: sorted});
  }

  handleSortByAbv = () => {
    const sorted = this.state.data.sort(function(a, b) {
      return b.abv - a.abv;
    })
    this.setState({data: sorted});
  }

  handleChange = (value) => {
    this.setState({searchText: value});
  }

  search = () => {
    const value = this.state.searchText;
    axios.get(`https://api.punkapi.com/v2/beers/?food=${value}`).then((response) => {this.setState({data: response.data})});
    this.setState({searchText: ''});
  }

  reset = () => {
    axios.get('https://api.punkapi.com/v2/beers').then((response) => {this.setState({data: response.data})});
    this.setState({searchText: ''});
  }

  getRandomBeer = () => {
    axios.get('https://api.punkapi.com/v2/beers/random').then((response) => {this.setState({data: response.data})});
  }

  render() {
    const beersList = this.state.data.map((beer, i) => {
      return <BeerCard key={i} name={beer.name} tagline={beer.tagline} abv={beer.abv} description={beer.description}/>
    })
    return (
      <div className="App">
        <div className="nav-container">
          <div className="nav-row">
            <input className="search-input" onChange={(e) => this.handleChange(e.target.value)} value={this.state.searchText} placeholder="Search by food pairing"></input>
            <button className="nav-button" onClick={this.search}>Search</button>
          </div>
          <div className="nav-row">
            <button className="nav-button" onClick={this.handleSortByName}>Sort By Name</button>
            <button className="nav-button" onClick={this.handleSortByAbv}>Sort By ABV</button>
          </div>
          <div className="nav-row">
            <button className="nav-button-single" onClick={this.getRandomBeer}>Get a Random Beer</button>
          </div>
          <div className="nav-row">
            <button className="nav-button-single" onClick={this.reset}>Reset Beer List</button>
          </div>
        </div>
        <div className="beer-list">
          {beersList}
        </div>
      </div>
    );
  }
}

export default App;
