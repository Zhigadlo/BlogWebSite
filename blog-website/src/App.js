import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar.component";
import MainPage from './components/popular-blogs.component';
import BlogPage from './components/blog.component';
import CreateBlogPage from './components/create-blog.component';
import CreateUserPage from './components/create-user.component';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
