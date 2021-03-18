import React, { Component } from 'react';
import './App.css';
import TaskForm from './Components/TaskForm'
import Control from './Components/Control'
import TaskList from './Components/TaskList';
import {findIndex} from 'lodash';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: '',
            sortBy: 'name',
            sortValue: 1

        }
    }

    random() {
        return Math.floor((1 + Math.random()) * 0X10000).toString(16).substring(1);
    }

    generateId() {
        return this.random() + this.random() + this.random() + this.random() + "-"
            + this.random() + this.random() + this.random();
    }

    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            })
        }
    }

  

    onToggleForm = () => {

        if (this.state.isDisplayForm && this.state.taskEditing !== null) {
            this.setState({
                isDisplayForm: true,
                taskEditing: null
            })
        } else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditing: null
            })
        }
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: !this.state.isDisplayForm
        });
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm: true
        })
    }

    addTask = (data) => {
        var tasks = this.state.tasks;
        if (data.id === '') {
            data.id = this.generateId();
            tasks.push(data);
        } else {
            let idx = findIndex(tasks,(task) => task.id === data.id);

            tasks[idx] = data;
        }
        this.setState({
            tasks: tasks,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            }
        })
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));


    }

    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        let idx = findIndex(tasks,(task) => task.id === id);
        if (idx !== -1) {
            tasks[idx].status = !tasks[idx].status;
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    onDelete = (id) => {
        var { tasks } = this.state;
        let idx = findIndex(tasks,(task) => task.id === id);
        if (idx !== -1) {
            tasks.splice(idx, 1);
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.onCloseForm();
    }

    onUpdate = (id) => {
        var { tasks } = this.state;
        let idx =findIndex(tasks,(task) => task.id === id);
        let taskEditing = tasks[idx];
        this.setState({
            taskEditing: taskEditing
        })
        this.onShowForm();

    }



    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        });
    }

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        })
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        })
    }
    render() {
        var { tasks,
            isDisplayForm,
            taskEditing,
            filter,
            sortBy,
            sortValue } = this.state;
        // Filter
        if (filter) {
            if (filter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                })
            }
            if (filter.status !== -1) {
                tasks = tasks.filter((task) => {
                    return task.status == filter.status;
                })
            }
        }
        // Search
        if (this.state.keyword) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(this.state.keyword) !== -1;
            })
        }

        // Sort
        if (this.state.sortBy === 'name') {
            tasks.sort((a, b) => {
                if (a.name > b.name) return sortValue;
                else if (a.name < b.name) return -sortValue;
                return 0;
            })
        }
        else {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -sortValue;
                else if (a.status < b.status) return sortValue;
                return 0;
            })
        }


        var elmTaskForm = isDisplayForm
            ? <TaskForm
                onSubmit={this.addTask}
                onCloseForm={this.onCloseForm}
                task={taskEditing}
            /> : '';

        return (
            <div className="container">
                <h2 className="text-center my-4">Quản lý công việc</h2>
                <div className="row">
                    {/* Form */}
                    <div className={isDisplayForm ? 'col-4' : ''}>
                        {elmTaskForm}
                    </div>

                    <div className={isDisplayForm ? 'col-8' : 'col-12'}>
                        <div className="card border-0">
                            <div className="card-body">
                                <a className="btn btn-primary" onClick={this.onToggleForm}>
                                    <i className="fas fa-plus"></i> Thêm công việc
                                </a>

                                <hr />
                                <Control onSearch={this.onSearch}
                                    onSort={this.onSort}
                                    sortBy={sortBy}
                                    sortValue={sortValue} />

                                {/* <!-- List --> */}
                                <div className="row mt-2">
                                    <div className="col-12">
                                        <TaskList
                                            tasks={tasks}
                                            onUpdateStatus={this.onUpdateStatus}
                                            onDelete={this.onDelete}
                                            onUpdate={this.onUpdate}
                                            onFilter={this.onFilter}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;