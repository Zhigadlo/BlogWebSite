import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
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
                        <Link to="/users/create">CreateUserPage</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}