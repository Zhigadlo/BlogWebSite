import React, { Component } from 'react';
import axios from 'axios';

export default class PostInfo extends Component {
    constructor(props){
        super(props);

        this.onChangeComment = this.onChangeComment.bind(this);
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
            users: [],
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
        axios.get('http://localhost:5000' + fullpath).then(res => {
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

    onChangeComment(e){
        this.setState({
            newComment: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        let cookies = document.cookie.split("=")
        if(cookies[cookies.length-1] === "0"){
            window.location = '/login'
        }
        else{
            let authorIndex = this.state.users.findIndex(c => c._id === cookies[cookies.length-1])
            
            let authorId = this.state.users[authorIndex]._id
            let date = (new Date()).toISOString()

            const comment = {
                text: this.state.newComment,
                likes: 0,
                authorId: authorId,
                date: date
            }
            console.log(comment)
            axios.post('http://localhost:5000/comments/add', comment)
                .then(res => {
                    this.state.commentIds.push(res.data._id)
                    this.state.comments.push(res.data)

                    this.setState({
                        commentIds: this.state.commentIds,
                        comments: this.state.comments
                    })
                });
            const post = {
                title: this.state.title,
                body: this.state.body,
                authorId: this.state.authorId,
                likes: this.state.likes,
                commentIds: this.state.commentIds,
                date: this.state.date
            }

            axios.post('http://localhost:5000/posts/update/' + this.state.postId, post)
                 .then(res => console.log(res.data));
        }
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <h3>{this.state.body}</h3>
                <h4>Likes: {this.state.likes} Date: {this.state.date}</h4>
                <h4>Comments({this.state.commentIds.length}):</h4>
                {this.state.commentIds.map((value) => {
                    let i = this.state.comments.findIndex(c => c._id === value)
                    let comment
                    
                    if(i !== -1){
                        comment = this.state.comments[i]
                       // console.log(comment)
                        i = this.state.users.findIndex(u => u._id === comment.authorId);
                        let author;
                        if(i === -1){
                            author = "anonymus";
                        }
                        else{
                            author = this.state.users[i].nickname;
                        }
                        return <CommentInfo model = {comment} author={author}/>
                    }
                    
                })}
                <form onSubmit={this.onSubmit}>
                    <label>You can leave a comment here</label><br/>
                    <input type="text" 
                           required
                           value={this.state.newComment}
                           onChange={this.onChangeComment}>
                    </input><br/>
                    <input type="submit" value="Leave comment"/>
                </form>
            </div>
        )
    }

    
}

function CommentInfo(params){
    if(params.model !== undefined){
    return  <div>
                <h3>{params.model.text}</h3>
                <h4>{params.author}</h4>
                <h4>Likes: {params.model.likes} Date: {params.model.date}</h4>
            </div>
    }
}
