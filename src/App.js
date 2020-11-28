import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Blog from './component/Blog';
import BlogPost from './component/BlogPost';
import Dashboard from './component/Dashboard';
import ForgotPassword from './component/ForgotPassword';
import Login from './component/Login';
import Navbar from './component/Navbar';
import Post from './component/Post';
import PrivateRoute from './component/PrivateRoute';
import Signup from './component/Signup';
import UpdateProfile from './component/UpdateProfile';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Navbar />
          <DataProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/blog" component={Blog} />
              <Route exact path="/blog/:blogPostId" component={BlogPost} />
              <Route exact path="/post/:postId" component={Post} />
            </Switch>
          </DataProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
