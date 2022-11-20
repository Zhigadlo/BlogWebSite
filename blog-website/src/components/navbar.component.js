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
            <nav>
                <NavLabels nickname = {this.state.nickname}/>
            </nav>
        )
    }
}

function NavLabels(params){
    if(params.nickname == "anonymus"){
        return  <ul>
                    <li>
                        <Link to="/">MainPage</Link>
                    </li>
                    <li>
                        <Link to="/users/create">RegistrationPage</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
    }
    else{
        return  <ul>
                    <li>
                        <Link to="/">MainPage</Link>
                    </li>
                    <li>
                        <Link to="/userposts">Your posts</Link>
                    </li>
                    <li>
                        <Link to="/blog/create">CreateBlogPage</Link>
                    </li>
                    <li>
                        <Link to="/users/update">UpdateUserInformationPage</Link>
                    </li>
                    <h1>Hallo {params.nickname}</h1>
                    <button onClick={Logout}>Logout</button>
                </ul>
    }
}

function Logout(){
    document.cookie = "authorisedUser=0"
    window.location = '/login'
}