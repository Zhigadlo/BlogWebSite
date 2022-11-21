import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import MainPage from './components/popular-blogs.component';
import UserPostsPage from './components/user-posts.component';
import CreatePostPage from './components/create-post.component';
import CreateUserPage from './components/create-user.component';
import UpdateUserPage from './components/update-user-information.component';
import PostInfo from './components/post-info.component';
import LoginPage from './components/login.component';
import PostInfoUpdate from './components/update-post-info.component';

function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<MainPage/>} />
          <Route path="/userposts/:id" exact element={<PostInfoUpdate/>}/>
          <Route path="/userposts" exact element={<UserPostsPage/>}/>
          <Route path="/blog/create" exact element={<CreatePostPage/>}/>
          <Route path="/users/create" exact element={<CreateUserPage/>}/>
          <Route path="/users/update" exact element={<UpdateUserPage/>}/>
          <Route path="/posts/:id" exact element={<PostInfo/>}/>
          <Route path="/login" exact element={<LoginPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
