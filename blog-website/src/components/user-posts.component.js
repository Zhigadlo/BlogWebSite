import axios from 'axios';
import React, { Component } from 'react';

export default class UserPostsPage extends Component {

    constructor(props){
        super(props)

        this.state = {
            posts: [],
            users: [],
            authorId: '',
            author: ''
        }
    }

    componentDidMount(){
        let cookies = document.cookie.split("=")
        let authorId = cookies[cookies.length-1]
        this.setState({
            authorId: authorId
        })
        
        axios.get('http://localhost:5000/posts/').then(res => {
            this.setState({
                posts: res.data
            })
        });

        axios.get('http://localhost:5000/users/' + this.state.authorId).then(res => {
            this.setState({
                author: res.data.nickname
            })
        });
    }

    render() {
        return (
            <div>
                <div>This is your posts.</div>
                <div>
                    {this.state.posts.map((value) => {
                        if(value.authorId === this.state.authorId){
                            return <PostHeader model = {value} author={this.state.author}/>
                        }
                    })}
                </div>
            </div>
        )
    }
}

function PostHeader(params)
{
    return  <div>
                <a href={"/posts/" + params.model._id}><h1>{params.model.title}</h1></a>
                <h2>{params.author}</h2>
                <h3>Likes: {params.model.likes}</h3>
            </div>
}