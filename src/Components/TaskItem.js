import React, { Component } from 'react';
class TaskItem extends React.Component {

    onUpdateStatus = () =>{
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete =()=>{
        this.props.onDelete(this.props.task.id);
    }

    onUpdate =()=>{
        this.props.onUpdate(this.props.task.id);
    }

    render() {
        var {task,index} = this.props;
        return <tr>
                    <td>{index+1}</td>
                    <td>{task.name}</td>
                    <td className="text-center">
                        <h5>
                            <span 
                                className={task.status===true?'badge badge-success':'badge badge-danger'}
                                onClick={this.onUpdateStatus}>
                                {task.status===true?'Kích hoạt':'Ẩn'}
                                
                            </span>
                        </h5>
                    </td>
                    <td className="text-center ">
                        <a 
                            className="btn btn-warning text-white"
                            role="button"
                            onClick={this.onUpdate}>
                            <i className="fas fa-pen"></i> Sửa
                    </a> &nbsp;
                    <a 
                        className="btn btn-danger"
                        role="button"
                        onClick={this.onDelete}>
                            <i className="far fa-trash-alt"></i> Xóa
                    </a>
                    </td>
                </tr>
    }
}
export default TaskItem;