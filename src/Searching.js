import React, { Component } from 'react'

export default class Searching extends Component {
    render() {
        return (
            <div className="search-paging">
                <form onSubmit={this.props.handleSearch}>
                    <input onChange={this.props.handleChange} value={this.props.pokemon}></input> 
                    <button>Search</button>
                    <div id="search-type">
                        <label>Name: <input id="name-check" type="radio" name="searchtype" value={this.props.searchType} onClick={e => this.props.handleType('pokemon')}></input></label>
                        <label>Type: <input type="radio" name="searchtype" value={this.props.searchType} onClick={e => this.props.handleType('type')}></input></label>
                        <label>Ability: <input type="radio" name="searchtype" value={this.props.searchType} onClick={e => this.props.handleType('ability')}></input></label>
                    </div>
                </form>
            </div>
        )
    }
}
