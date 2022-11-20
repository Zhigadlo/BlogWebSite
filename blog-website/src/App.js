import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import MainPage from './components/popular-blogs.component';
import BlogPage from './components/blog.component';
import CreateBlogPage from './components/create-blog.component';
import CreateUserPage from './components/create-user.component';
import UpdateUserPage from './components/update-user-information.component';
import PostInfo from './components/post-info.component';
import LoginPage from './components/login.component';

function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<MainPage/>} />
          <Route path="/blog" exact element={<BlogPage/>}/>
          <Route path="/blog/create" exact element={<CreateBlogPage/>}/>
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
