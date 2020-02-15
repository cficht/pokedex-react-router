import React, { Component } from 'react';
import './App.css';

export default class PokeItem extends Component {
    render() {
        return (
            <li className="poke-item">
                <h2><span className="name-case">{this.props.pokemon.pokemon}</span></h2>
                <img src={this.props.pokemon.url_image} alt=""></img>
                <h5 style={{ backgroundColor: this.props.pokemon.color_1 }}>Type: <span className="name-case">{this.props.pokemon.type_1}</span></h5>
                <h6>Attack: {this.props.pokemon.attack}</h6>
                <h6>Defense: {this.props.pokemon.defense}</h6>
            </li>
        );
    }
}