import React, { Component } from "react";
class Sort extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick = (sortBy, sortValue) => {
        console.log(sortBy,'-', sortValue);
        this.props.onSort(sortBy, sortValue);
    }


    render() {
        return (
            <div className="col-6">
                <div className="dropdown open">
                    <button className="btn btn-primary" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sắp xếp <i className="far fa-caret-square-down "></i>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="triggerId">
                        <a className={(this.props.sortBy==='name'&&this.props.sortValue===1)?'sort_selected dropdown-item': 'dropdown-item'}
                         role ="button" onClick={() => { this.onClick("name", 1); }}>
                            <i className="fas fa-sort-alpha-down"></i> Tên A - Z
                        </a>
                        <a className={(this.props.sortBy==='name'&&this.props.sortValue===-1)?'sort_selected dropdown-item': 'dropdown-item'}
                         role = "button" onClick={() => { this.onClick("name", -1); }}>
                            <i className="fas fa-sort-alpha-down-alt "></i> Tên Z - A
                        </a>
                        <hr />
                        <a className={(this.props.sortBy==='status'&&this.props.sortValue===1)?'sort_selected dropdown-item': 'dropdown-item'}
                         role = "button" onClick={() => { this.onClick("status", 1); }}>
                            Trạng thái kích hoạt
                        </a>
                        <a className={(this.props.sortBy==='status'&&this.props.sortValue===-1)?'sort_selected dropdown-item': 'dropdown-item'}
                         role = "button" onClick={() => { this.onClick("status", -1); }}>
                            Trạng thái ẩn
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
export default Sort;
