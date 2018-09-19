import React, { Component } from 'react';
//import { getBeerData } from './dataService';
import './App.css';
const axios = require('axios');

function BeerCard(props) {
  return (
    <div className='beer-card'>
      <div>Name: {props.name}</div>
      <div>Tagline: {props.tagline}</div>
      <div>Description: {props.description}</div>
      <div>ABV %: {props.abv}</div>
    </div>
  )
}

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
  }

  reset = () => {
    axios.get('https://api.punkapi.com/v2/beers').then((response) => {this.setState({data: response.data})});
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
        <div className="nav">
          <button onClick={this.handleSortByName}>Sort By Name</button>
          <button onClick={this.handleSortByAbv}>Sort By ABV</button>
        </div>
        <div>
          <input onChange={(e) => this.handleChange(e.target.value)} placeholder="Search by food pairing"></input>
          <button onClick={this.search}>Search</button>
        </div>
        <div>
          <button onClick={this.getRandomBeer}>Get a Random Beer</button>
        </div>
        <div>
          <button onClick={this.reset}>Reset Beer List</button>
        </div>
        {beersList}
      </div>
    );
  }
}

export default App;
