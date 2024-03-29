import React, { Component } from 'react';
import axios from 'axios';

export default class UpdateUserPage extends Component {
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangelastName = this.onChangelastName.bind(this);
        this.onChangeNickname = this.onChangeNickname.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nickname: '',
            name: '',
            lastname: '',
            password: '',
            users: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users/').then(res => {
            this.setState({
                users: res.data
            })
        })
    }

    onChangeNickname(e){
        this.setState({
            nickname: e.target.value
        })
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }

    onChangelastName(e){
        this.setState({
            lastname: e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            lastName: this.state.lastname,
            nickname: this.state.nickname,
            password: this.state.password
        }
        
        let i = this.state.users.findIndex(u => u.nickname === user.nickname)
        if(i !== -1){
            axios.post('http://localhost:5000/users/update/' + this.state.users[i]._id, user)
                .then(res => console.log(res.data));
            window.location = '/';
        }
        else
        {
            console.log("There is no such user")
        }
    }
    
    render() {
        return (
            <div>
                <h1>Update information</h1>
                <form onSubmit={this.onSubmit}>
                    <label>Nickname: </label>
                    <input type="text"
                            required
                            value={this.state.nickname}
                            onChange={this.onChangeNickname}>
                    </input><br/>
                    <label>Name: </label>
                    <input type="text"
                            required
                            value={this.state.name}
                            onChange={this.onChangeName}>
                    </input><br/>
                    <label>Last name: </label>
                    <input type="text"
                            required
                            value={this.state.lastname}
                            onChange={this.onChangelastName}>
                    </input><br/>
                    <label>Password: </label>
                    <input type="text"
                            required
                            value={this.state.password}
                            onChange={this.onChangePassword}>
                    </input><br/>
                    <input type="submit" value="Update"/>
                </form>
            </div>
        )
    }
}