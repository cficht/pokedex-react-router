import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PokeItem from './PokeItem.js';
import Searching from './Searching.js';
import Paging from './Paging.js';
import { getPokemon } from './api.js';
import shortid from 'shortid';

export default class List extends Component {

    state = {
        pokeDex: [],
        page: 1,
        pokemon: '',
        searchType: 'pokemon',
        totalPokemon: 801,
        perPage: 20,
        maxPage: 41
    }

    async componentDidMount() {
        let pokeOnline;

        if (!this.props.match.params.pokemon) {
            this.setState({ searchType: 'pokemon' });
            this.setState({ pokemon: '' })
            this.setState({ page: 1 });
            pokeOnline = await getPokemon(this.state.pokemon, this.state.searchType, this.state.searchPage);
        } else {
            const paramSplit = this.props.match.params.pokemon.split('_');
            const searchType = paramSplit[0];
            const searchDetail = paramSplit[1];
            const searchPage = paramSplit[2];

            this.setState({ searchType: searchType })
            this.setState({ pokemon: searchDetail })
            this.setState({ page: searchPage })
            pokeOnline = await getPokemon(searchDetail, searchType, searchPage);
        }

        this.setState({ pokeDex: pokeOnline.body.results });
        this.setState({ totalPokemon: pokeOnline.body.count });
        this.setState({ maxPage: Math.ceil(this.state.totalPokemon / this.state.perPage) })
    }

    handlePageChange = async (incre) => {
        const currentPage = Number(this.state.page);
        const newPage = currentPage + incre;
        this.setState({ page: newPage });
        const newParam = `${this.state.searchType}_${this.state.pokemon}_${newPage}`;

        const pokeOnline = await getPokemon(this.state.pokemon, this.state.searchType, newPage);
        this.setState({ pokeDex: pokeOnline.body.results });

        this.props.history.push(newParam);
    }

    handleSearchClick = async e => {
        e.preventDefault();
        
        const newSearchPage = 1;
        this.setState({ page: newSearchPage });
        const newParam = `${this.state.searchType}_${this.state.pokemon}_${newSearchPage}`;

        const newPokemonOnline = await getPokemon(this.state.pokemon, this.state.searchType, newSearchPage);
        this.setState({ pokeDex: newPokemonOnline.body.results });
        this.setState({ totalPokemon: newPokemonOnline.body.count });
        this.setState({ maxPage: Math.ceil(this.state.totalPokemon / this.state.perPage) })

        this.props.history.push(newParam);
    }

    handleChange = e => {
        const casingFix = (e.target.value).toString();       
        this.setState({ pokemon: casingFix.toLowerCase() });
    }

    handleType = (typename) => {
        this.setState({ searchType: typename });
    }

    render() {
        const pokeNode = this.state.pokeDex.map(pokemon => <Link to={`detail/${pokemon._id}`} key={shortid.generate()}> <PokeItem pokemon={pokemon}/> </Link>)

        return (
            <div>
                <div id="page-top">
                    <Searching handleSearch={this.handleSearchClick} handleChange={this.handleChange} handleType={this.handleType} searchType={this.state.searchType} pokemon={this.state.pokemon}></Searching>
                </div>
                <ul>
                    {pokeNode}
                </ul>
                <div id="page-bottom">
                    <Paging handlePageChange={this.handlePageChange} page={this.state.page} maxPage={this.state.maxPage} totalPokemon={this.state.totalPokemon}></Paging> 
                </div>
            </div>
        )
    }
}
