import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import CreateAnalysis from './component/Analysis/CreateAnalysis';
import EditAnalysis from './component/Analysis/EditAnalysis';
import Post from './component/Analysis/Post';
import Blog from './component/Blogpost/Blog';
import Blogpost from './component/Blogpost/Blogpost';
import CreateBlogpost from './component/Blogpost/CreateBlogpost';
import EditBlogpost from './component/Blogpost/EditBlogpost';
import Dashboard from './component/Dashboard';
import ForgotPassword from './component/ForgotPassword';
import Login from './component/Login';
import Navbar from './component/Navbar';
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
                <Route path="/create-analysis" component={CreateAnalysis} />
                <Route path="/edit-analysis" component={EditAnalysis} />
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
