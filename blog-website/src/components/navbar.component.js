import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Navbar extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            nickname: "",
            _id: ""
        }
    }

    componentDidMount(){
        let cookies = document.cookie.split('=')
        let id = cookies[cookies.length-1]
        console.log(id)
        if(id === "0"){
            this.setState({ nickname: "anonymus", _id: "0" }) 
        }
        else{
            axios.get('http://localhost:5000/users/' + id).then(res => {
                this.setState({
                    nickname: res.data.nickname
                })
            })
        }
    }
    
    render(){
        return (
            <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <NavLabels nickname = {this.state.nickname}/>
            </nav>
        )
    }
}

function NavLabels(params){
    if(params.nickname == "anonymus"){
        return  <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul class="navbar-nav flex-grow-1">
                    <li class="nav-item">
                        <Link class="nav-link text-dark" to="/">MainPage</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link text-dark" to="/users/create">RegistrationPage</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link text-dark" to="/login">Login</Link>
                    </li>
                </ul></div>
    }
    else{
        return  <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                <ul class="navbar-nav flex-grow-1">
                    <li class="navbar-brand">
                        <Link class="nav-link text-dark" to="/">MainPage</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link text-dark" to="/userposts">Your posts</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link text-dark" to="/blog/create">CreateBlogPage</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link text-dark" to="/users/update">UpdateUserInformationPage</Link>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <Link class="nav-link text-dark" to="/userposts">Hallo {params.nickname}</Link>
                    </li>
                    <li class="nav-item">
                        <button class="nav-link btn btn-link text-dark" onClick={Logout}>Logout</button>
                    </li>
                    
                </ul>
                </div>
    }
}

function Logout(){
    document.cookie = "authorisedUser=0"
    window.location = '/login'
}