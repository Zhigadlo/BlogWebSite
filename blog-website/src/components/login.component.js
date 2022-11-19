import React, { Component } from 'react';
import axios from 'axios';

export default class LoginPage extends Component{
    constructor(props){
        super(props);

        this.onChangeNickname = this.onChangeNickname.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nickname: '',
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

    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            nickname: this.state.nickname,
            password: this.state.password
        }
        
        let i = this.state.users.findIndex(u => u.nickname === user.nickname && u.password === user.password)
        if(i !== -1){
            window.location = '/'
            var cookie = "authorisedUser=" + this.state.users[i]._id
            document.cookie = cookie
        }
        else
        {
            console.log("There is no such user")
        }

    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.onSubmit}>
                    <label>Nickname: </label>
                    <input type="text"
                            required
                            value={this.state.nickname}
                            onChange={this.onChangeNickname}>
                    </input><br/>
                    <label>Password: </label>
                    <input type="text"
                            required
                            value={this.state.password}
                            onChange={this.onChangePassword}>
                    </input><br/>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        )
    }

}