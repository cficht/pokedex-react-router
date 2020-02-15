import React, { Component } from 'react';
import request from 'superagent';
import PokeItem from './PokeItem.js';

export default class List extends Component {

    state = { pokeDex: [] }

    async componentDidMount() {
        const pokeOnline = await request.get('https://alchemy-pokedex.herokuapp.com/api/pokedex');
        this.setState({ pokeDex: pokeOnline.body.results });
      }

    render() {
        const pokeNode = this.state.pokeDex.map(pokemon => <PokeItem pokemon={pokemon} />)
        return (
            <div>
                <ul>
                    {pokeNode}
                </ul>                
            </div>
        )
    }
}
