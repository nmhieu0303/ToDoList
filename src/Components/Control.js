import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class Control extends React.Component {

    onSearch = (keyword) => {
        this.props.onSearch(keyword);
    }

    onSort = (by,value) => {
        this.props.onSort(by,value);
    }
    render(){
        return (
            <div className="row mt-2">
            {/* Search */}
            <Search onSearch = {this.onSearch}/>

             {/* Sort */}
             <Sort onSort = {this.onSort}  sortBy = {this.props.sortBy} sortValue = {this.props.sortValue}/>
             </div>
        )
    }
}
export default Control;