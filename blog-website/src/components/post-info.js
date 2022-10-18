import React, { Component } from 'react';
import axios from 'axios';

export default class PostInfo extends Component {
    constructor(props){
        super(props);

        this.state = {
            post: Object,
            users: []
        }
    }

    componentDidMount(){
        
        let id = String(window.location.pathname)
        axios.get('http://localhost:5000' + id).then(res => {
            this.setState({
                post: res.data
            })
        });
        axios.get('http://localhost:5000/users/').then(res => {
            this.setState({
                users: res.data
            })
        });
    }


    render() {
        return (
            <div>
                <h1>{this.state.post.title}</h1>
                <h4>{this.state.post.body}</h4>
                <h3>Likes: {this.state.post.likes}</h3>
            </div>
        )
    }
}