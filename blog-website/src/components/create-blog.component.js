import React, { Component } from 'react';
import axios from 'axios';

export default class CreateBlogPage extends Component {
    
    constructor(props){
        super(props)

        this.onBodyChange = this.onBodyChange.bind(this)
        this.onTitleChange = this.onTitleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            title: '',
            body: '',
            authorId: ''
        }
    }
    
    onTitleChange(e){
        this.setState({
            title: e.target.value
        })
    }

    onBodyChange(e){
        this.setState({
            body: e.target.value
        })
    }

    componentDidMount(){
        let cookies = document.cookie.split("=")
        let authorId = cookies[cookies.length-1]
        this.setState({
            authorId: authorId
        })
    }

    onSubmit(e){
        e.preventDefault()

        const post = {
            title: this.state.title,
            body: this.state.body,
            commentIds: [],
            likes: 0,
            authorId: this.state.authorId,
            date: (new Date()).toISOString()
        }

        console.log(post)

        axios.post('http://localhost:5000/posts/add', post)
                .then(res => console.log(res));
        
        window.location = '/'
    }

    render() {
        return (
            <div>
                <h1>Blog creating</h1>
                <form onSubmit={this.onSubmit}>
                    <label>Title: </label>
                    <input type="text"
                            required
                            minLength="5"
                            value={this.state.nickname}
                            onChange={this.onTitleChange}>
                    </input><br/>
                    <label>Body: </label>
                    <input type="text"
                            required
                            minLength="50"
                            value={this.state.name}
                            onChange={this.onBodyChange}>
                    </input><br/>
                    <input type="submit" value="Create"/>
                </form>
            </div>
        )
    }
}