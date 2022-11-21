import React, { Component } from 'react';
import axios from 'axios';

export default class PostInfoUpdate extends Component {
    constructor(props){
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            postId: String,
            title: String,
            body: String,
            likes: Number,
            commentIds: [],
            authorId: String,
            date: Date,
            //post: Object,
            comments: [],
            newComment: ''
        }
    }

    componentDidMount(){
        //get post info
        let fullpath = String(window.location.pathname)
        let id = fullpath.split("/")
        let postid = id[id.length-1]
        //console.log(postid)
        axios.get('http://localhost:5000/posts/' + postid).then(res => {
            this.setState({
                postId: postid,
                title: res.data.title,
                body: res.data.body,
                likes: res.data.likes,
                commentIds: res.data.commentIds,
                date: res.data.date,
                authorId: res.data.authorId
            })
        });
        
        // get comments
        axios.get('http://localhost:5000/comments/').then(res => (
            this.setState({
                comments: res.data
            })
        ))
    }

    onChangeTitle(e){
        this.setState({
            title: e.target.value
        })
    }
    onChangeBody(e){
        this.setState({
            body: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        let cookies = document.cookie.split("=")
        if(cookies[cookies.length-1] === "0"){
            window.location = '/login'
        }
        else{
            const post = {
                title: this.state.title,
                body: this.state.body,
                authorId: this.state.authorId,
                likes: this.state.likes,
                commentIds: this.state.commentIds,
                date: this.state.date
            }
            
            console.log(post)

            axios.post('http://localhost:5000/posts/update/' + this.state.postId, post)
                 .then(res => console.log(res.data));


            window.location = '/userposts'
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>Title</label><br/>
                        <input type="text" 
                               required
                               value={this.state.title}
                               onChange={this.onChangeTitle}>
                        </input><br/>
                    <label>Body</label><br/>
                        <input type="text" 
                               required
                               value={this.state.body}
                               onChange={this.onChangeBody}>
                        </input><br/>
                    <h4>Likes: {this.state.likes} Date: {this.state.date}</h4>
                    <input type="submit" value="Update"/>
                </form>
            </div>
        )
    }    
}
