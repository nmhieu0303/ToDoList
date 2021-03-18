import React, { com } from 'react';
import TaskItem from './TaskItem';
class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1 // all: -1, active : 1 , deactive : 0
        }
    }

    onUpdateStatus = (id) =>{
        this.props.onUpdateStatus(id);
    }

    onDelete = (id) =>{
        this.props.onDelete(id);
    } 

    onUpdate = (id) =>{
        this.props.onUpdate(id);
    }

    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus,
        )

        this.setState({
            [name] : value
        })
    }

    render() {
        var {tasks} = this.props;
        var {filterName,filterStatus} = this.state;
        var elmTasks = tasks.map((task,index)=>{
            return <TaskItem 
                        key={task.id} 
                        index={index} 
                        task={task} 
                        onUpdateStatus={this.props.onUpdateStatus}
                        onDelete = {this.props.onDelete}
                        onUpdate = {this.props.onUpdate}
                    />
        })
        return <table className="table table-bordered table-hover">
            <thead className="thead-dark">
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input name="filterName" type="text" 
                        className="form-control"
                        onChange={this.onChange} 
                        value={this.filterName}
                        />
                    </td>
                    <td>
                        <select className="form-control"
                        name="filterStatus"
                        onChange={this.onChange}
                        value={this.filterStatus} 
                        >
                            <option value={-1}>Tất cả</option>
                            <option value={0}>Ẩn</option>
                            <option value={1}>Kích hoạt</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                {elmTasks}
            </tbody>
        </table>

    }
}
export default TaskList;