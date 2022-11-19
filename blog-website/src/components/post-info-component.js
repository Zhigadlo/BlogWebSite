import React, { Component } from 'react';
import axios from 'axios';

export default class PostInfo extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: String,
            body: String,
            likes: Number,
            commentIds: [],
            authorId: String,
            date: Date,
            //post: Object,
            users: [],
            comments: [],
        }
    }

    componentDidMount(){
        //get post info
        let id = String(window.location.pathname)
        axios.get('http://localhost:5000' + id).then(res => {
            this.setState({
                title: res.data.title,
                body: res.data.body,
                likes: res.data.likes,
                commentIds: res.data.commentIds,
                date: res.data.date,
                authorId: res.data.authorId
            })
        });

        // get users
        axios.get('http://localhost:5000/users/').then(res => {
            this.setState({
                users: res.data
            })
        });
        // get comments
        axios.get('http://localhost:5000/comments/').then(res => (
            this.setState({
                comments: res.data
            })
        ))
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <h4>{this.state.body}</h4>
                <h3>Likes: {this.state.likes} Date: {this.state.date}</h3>
                <h3>Comments({this.state.commentIds.length}):</h3>
                {this.state.commentIds.map((value) => {
                    let i = this.state.comments.findIndex(c => c._id === value)
                    let comment
                    if(i !== -1){
                        comment = this.state.comments[i]
                        
                    }

                    i = this.state.users.findIndex(u => u._id === comment.authorId);
                    let author;
                    console.log(author)
                    if(i === -1){
                        author = "anonymus";
                    }
                    else{
                        author = this.state.users[i].nickname;
                    }
                    return <CommentInfo model = {comment} author={author}/>
                })}
            </div>
        )
    }
}

function CommentInfo(params)
{
    return  <div>
                <h2>{params.model.text}</h2>
                <h4>{params.author}</h4>
                <h4>Likes: {params.model.likes} Date: {params.model.date}</h4>
            </div>
}