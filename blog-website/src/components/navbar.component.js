import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Navbar extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            nickname: ''
        }
    }

    componentDidMount(){
        let id = document.cookie.split('=')[1]
        console.log(id)
        if(id === 'anonymus'){
            this.setState({ nickname: 'anonymus' }) 
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
                <ul>
                    <li>
                        <Link to="/">MainPage</Link>
                    </li>
                    <li>
                        <Link to="/blog">BlogPage</Link>
                    </li>
                    <li>
                        <Link to="/blog/create">CreateBlogPage</Link>
                    </li>
                    <li>
                        <Link to="/users/create">RegistrationPage</Link>
                    </li>
                    <li>
                        <Link to="/users/update">UpdateUserInformationPage</Link>
                    </li>
                    <LoginLabel nickname = {this.state.nickname} />
                    
                </ul>
            </nav>
        )
    }
}

function LoginLabel(params){
    if(params.nickname === 'anonymus'){
        return <li>
                    <Link to="/Login">Login</Link>
                </li>
    }
    else{
        return <div><button onClick={Logout}>Logout</button>
                <h1>Hallo {params.nickname}</h1></div>
        
    }
}

function Logout(){
    document.cookie = "authorisedUser=anonymus"
    window.location = '/login'
}
