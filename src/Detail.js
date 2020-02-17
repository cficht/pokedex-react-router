import React, { Component } from 'react'
import { getPokemonById } from './api.js';
import PokeItem from './PokeItem.js';

export default class Detail extends Component {
    
    state = { pokemonChosen: {} }

    async componentDidMount() {
        const pokeOnline = await getPokemonById(this.props.match.params.pokeid);
        this.setState({ pokemonChosen: pokeOnline.body });
    }

    render() {
        return (
            <div>
                <ul>
                    <PokeItem pokemon={this.state.pokemonChosen} />
                </ul>
            </div>
        )
    }
}
