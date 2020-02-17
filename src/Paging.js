import React, { Component } from 'react'

export default class Paging extends Component {
    render() {
        if (Math.ceil(this.props.totalPokemon / this.props.perPage) === 0) {
            return <h5 className="paging">No results! :(</h5>;
        }

        return (
            <div className="search-paging">
                <button onClick={e => this.props.handlePageChange(-1)} disabled={this.props.page === 1}>LAST</button>
                <button onClick={e => this.props.handlePageChange(1)} disabled={this.props.page === this.props.maxPage}>NEXT</button>
                <h5>Page: {this.props.page}/{this.props.maxPage}</h5>
            </div>
        )
    }
}
