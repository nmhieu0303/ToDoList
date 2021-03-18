import React, { Component } from "react";
class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            status: false,
        };
    }

    componentWillMount() {
        if (this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status,
            });
        } else if (!nextProps.task) {
            this.setState({
                id: "",
                name: "",
                status: false,
            });
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    };

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === "status") {
            value = target.value === "true" ? true : false;
        }
        this.setState({
            [name]: value,
        });
    };

    onSubmit = () => {
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    };

    onClear = () => {
        this.setState({
            name: "",
            status: false,
        });
        this.onCloseForm();
    };

    render() {
        let { id } = this.state;
        return (
            <div className="card" id="formAdd">
                <div className="card-header d-block">
                    <h3 className="d-flex justify-content-between">
                        {id !== "" ? "Cập nhật công việc" : "Thêm công việc"}
                        <a className="btn-close" onClick={this.onCloseForm}>
                            <i className="far fa-times-circle text-danger"> </i>
                        </a>
                    </h3>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label> Tên: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="bold"> Trạng thái: </label>
                            <select
                                className="form-control"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                            >
                                <option value={true}> Kích hoạt </option>
                                <option value={false}> Ẩn </option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-muted">
                    <a className="btn btn-warning text-white" onClick={this.onSubmit}>
                        Lưu lại
                    </a>
                    <a className=" ml-2 btn btn-danger" onClick={this.onClear}>
                        Hủy bỏ
                    </a>
                </div>
            </div>
        );
    }
}

export default TaskForm;
