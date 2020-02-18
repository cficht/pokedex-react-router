import React, { Component } from 'react';
import './App.css';

export default class PokeItem extends Component {
    
    render() {
        return (
            <li className="poke-item">
                <h2><span className="name-case">{this.props.pokemon.pokemon}</span></h2>
                <img src={this.props.pokemon.url_image} alt=""></img>
                <h5 style={{ backgroundColor: this.props.pokemon.color_1 }}>Type 1: <span className="name-case">{this.props.pokemon.type_1}</span></h5>
                <h5 style={{ backgroundColor: this.props.pokemon.color_2 }}>Type 2: <span className="name-case">{this.props.pokemon.type_2}</span></h5>
                <h6>Ability 1: <span className="name-case">{this.props.pokemon.ability_1}</span></h6>
                <h6>Ability 2: <span className="name-case">{this.props.pokemon.ability_2}</span></h6>
            </li>
        );
    }
}