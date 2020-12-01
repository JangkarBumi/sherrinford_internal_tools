import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Blog from './component/Blog/Blog';
import Blogpost from './component/Blog/Blogpost';
import CreateBlogpost from './component/Blog/CreateBlogpost';
import EditBlogpost from './component/Blog/EditBlogpost';
import Dashboard from './component/Dashboard';
import ForgotPassword from './component/ForgotPassword';
import Login from './component/Login';
import Navbar from './component/Navbar';
import CreatePost from './component/Post/CreatePost';
import EditPost from './component/Post/EditPost';
import Post from './component/Post/Post';
import PrivateRoute from './component/PrivateRoute';
import Signup from './component/Signup';
import UpdateProfile from './component/UpdateProfile';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { EditorProvider } from './contexts/EditorContext';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Navbar />
          <DataProvider>
            <EditorProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute
                  path="/update-profile"
                  component={UpdateProfile}
                />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/create-blogpost" component={CreateBlogpost} />
                <Route
                  path="/edit-blogpost/:blogPostId"
                  component={EditBlogpost}
                />
                <Route path="/create-post" component={CreatePost} />
                <Route path="/edit-post" component={EditPost} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/blog" component={Blog} />
                <Route exact path="/blog/:slugId" component={Blogpost} />
                <Route exact path="/post/:postId" component={Post} />
              </Switch>
            </EditorProvider>
          </DataProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
