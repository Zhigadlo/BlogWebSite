import React, { Component } from 'react';
import axios from 'axios';


export default class MainPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            posts: [],
            users: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/posts/').then(res => {
            this.setState({
                posts: res.data
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
            <div class="container text-center ">
                {this.state.posts.map((value) => {
                    let i = this.state.users.findIndex(u => u._id === value.authorId);
                    let author;
                    if(i === -1){
                        author = "anonymus";
                    }
                    else{
                        author = this.state.users[i].nickname;
                    }
                    
                    return <PostHeader model = {value} author={author}/>
                })}
            </div>
        )
    }
}

function PostHeader(params)
{
    return  <div class="bg-secondary col-sm">
                <a class="btn btn-secondary" href={"/posts/" + params.model._id}><h1>{params.model.title}</h1></a>
                <h2>Author: {params.author}</h2>
                <h3>Likes: {params.model.likes}</h3>
            </div>
}