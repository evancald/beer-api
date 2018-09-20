import React from 'react';
import './App.css';

function BeerCard(props) {
  return (
    <div className='beer-card'>
      <div><b>Name: </b>{props.name}</div>
      <div><b>% ABV:</b> {props.abv}</div>
      <div><b>Tagline: </b>{props.tagline}</div>
      <div><b>Description: </b>{props.description}</div>
      </div>
    )
  }

export default BeerCard;