import React, { Component } from 'react';
import BeerCard from './BeerCard';
import './App.css';
const axios = require('axios');

class App extends Component {
  state = {
    data: [],
    name: '',
    tagline: '',
    abv: null,
    description: ''
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/beers').then((response) => {this.setState({data: response.data})});
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

  deleteBeer = () => {
    axios.delete('http://localhost:8080/api/beers').then((response) => {this.setState({data: response.data})});
  }

  updateName(value) {
    this.setState({name: value});
  }

  updateTagline(value) {
    this.setState({tagline: value});
  }

  updateAbv(value) {
    this.setState({abv: value});
  }

  updateDescription(value) {
    this.setState({description: value});
  }

  addBeer = () => {
    axios.post('http://localhost:8080/api/beers', {
      name: this.state.name,
      tagline: this.state.tagline,
      abv: this.state.abv,
      description: this.state.description
    }).then((response) => {
      this.setState({data: response.data})
    })
    this.setState({name: '', tagline: '', abv: null, description: ''});
  }

  render() {
    const beersList = this.state.data.map((beer, i) => {
      return <BeerCard key={i} name={beer.name} tagline={beer.tagline} abv={beer.abv} description={beer.description}/>
    })
    return (
      <div className="App">
        <div className="add-beer">
          <h2>Create Your Own Beer</h2>
          <span>Name</span><input onChange={(e) => this.updateName(e.target.value)} value={this.state.name} placeholder="Name"/>
          <span>Tagline</span><input onChange={(e) => this.updateTagline(e.target.value)} value={this.state.tagline} placeholder="Tagline"/>
          <span>% ABV</span><input onChange={(e) => this.updateAbv(e.target.value)} value={this.state.abv} placeholder="% ABV"/>
          <span>Description</span><input onChange={(e) => this.updateDescription(e.target.value)} value={this.state.description} placeholder="Description"/>
          <button className="nav-button-single" onClick={this.addBeer}>Submit</button>
        </div>
        <div className="nav-container">
          <div className="nav-row">
            <button className="nav-button" onClick={this.handleSortByName}>Sort By Name</button>
            <button className="nav-button" onClick={this.handleSortByAbv}>Sort By ABV</button>
          </div>
          <div className="nav-row">
          <button className="nav-button-single" onClick={this.deleteBeer}>Delete</button>
          </div>
        </div>
        <div className="beer-list">
          <h2>Beer List</h2>
          {beersList}
        </div>
      </div>
    );
  }
}

export default App;
