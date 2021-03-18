import React, {Component} from 'react';
class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }
    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        })
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }

    render() {
        return <div className="col-6">
            <div className="input-group">
                <input type="text" className="form-control" name ="keyword" value={this.state.keyword} onChange={this.onChange} />
                <span className="input-group-btn">
                    <button className="btn btn-primary"
                        type="button"
                        onClick = {this.onSearch}>
                        <i className="fas fa-search"></i>Tìm
                    </button>
                </span>
            </div>
        </div>
    }
}
export default Search;