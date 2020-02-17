import request from 'superagent';

export function getPokemon(pokemon, searchType, page){
    return request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex?${searchType}=${pokemon}&page=${page}`);
}

export function getPokemonById(uniqueId){
    return request.get(`https://alchemy-pokedex.herokuapp.com/api/pokedex/${uniqueId}`);
}