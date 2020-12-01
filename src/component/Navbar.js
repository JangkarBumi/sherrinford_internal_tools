import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [error, setError] = useState('');

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <div className="flex justify-between">
      <Link to="/">Homepage</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/create-blogpost">Manage Blogpost</Link>
      <Link to="/create-post">Manage Post</Link>

      {/* <p> Welcome, {currentUser.email}</p> */}

      {/* <Link to="/update-profile">Update Profile</Link> */}

      <button className="self-start" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
