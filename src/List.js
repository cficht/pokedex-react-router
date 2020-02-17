import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PokeItem from './PokeItem.js';
import Searching from './Searching.js';
import Paging from './Paging.js';
import { getPokemon } from './api.js';

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
        if (isNaN(this.state.page)) {
            this.setState({ page: 1 })
        }
        if (!this.props.match.params.pokemon) {
            this.props.match.params.pokemon = '';
            this.setState({ searchType: 'pokemon' })
        }

        const paramSplit = this.props.match.params.pokemon.split('_');
        const searchType = paramSplit[0];
        const searchDetail = paramSplit[1];
        const searchPage = paramSplit[2];
        this.props.match.params.pokemon = searchDetail;

        if (this.props.match.params.pokemon) {
            this.setState({ searchType: searchType })
            this.setState({ pokemon: searchDetail })
            this.setState({ page: searchPage })
        }

        const pokeOnline = await getPokemon(searchDetail, searchType, searchPage);
        this.setState({ pokeDex: pokeOnline.body.results });
        this.setState({ totalPokemon: pokeOnline.body.count });
        this.setState({ maxPage: Math.ceil(this.state.totalPokemon / this.state.perPage) })

        const nameCheck = document.getElementById('name-check');
        nameCheck.checked = true;
        this.setState({ searchType: nameCheck.value })
    }



    handlePageChange = async (incre) => {
        const currentPage = Number(this.state.page);
        const newPage = currentPage + incre;
        this.setState({ page: newPage })
        this.props.match.params.pokemon = `${this.state.searchType}_${this.state.pokemon}_${newPage}`;

        const pokeOnline = await getPokemon(this.state.pokemon, this.state.searchType, newPage);
        this.setState({ pokeDex: pokeOnline.body.results });
        this.setState({ maxPage: Math.ceil(this.state.totalPokemon / this.state.perPage) })

        this.props.history.push(`${this.props.match.params.pokemon.toString()}`);
    }

    handleSearchClick = async e => {
        e.preventDefault();
        this.state.page = 1;
        this.props.match.params.pokemon = `${this.state.searchType}_${this.state.pokemon}_${this.state.page}`;

        const newPokemonOnline = await getPokemon(this.state.pokemon, this.state.searchType, this.state.page);
        this.setState({ pokeDex: newPokemonOnline.body.results });
        this.setState({ totalPokemon: newPokemonOnline.body.count });
        this.setState({ maxPage: Math.ceil(this.state.totalPokemon / this.state.perPage) })

        this.props.history.push(`${this.props.match.params.pokemon.toString()}`);
    }

    handleChange = e => {
        this.setState({ pokemon: e.target.value });
    }

    handleType = e => {
        this.setState({ searchType: e.target.value });
    }

    render() {
        const pokeNode = this.state.pokeDex.map(pokemon => <Link to={`detail/${pokemon._id}`}> <PokeItem pokemon={pokemon} /> </Link>)

        return (
            <div>
                <div id="page-top">
                    <Searching handleSearch={this.handleSearchClick} handleChange={this.handleChange} handleType={this.handleType}></Searching>
                </div>
                <ul>
                    {pokeNode}
                </ul>
                <div id="page-bottom">
                    <Paging handlePageChange={this.handlePageChange} page={this.state.page} maxPage={this.state.maxPage} totalPokemon={this.state.totalPokemon} perPage={this.state.perPage}></Paging>
                </div>
            </div>
        )
    }
}
