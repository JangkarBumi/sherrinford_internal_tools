import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPost = [
    {
      title: 'Lorem ipsum dolor sit amet consectetur',
      image:
        'https://images.unsplash.com/photo-1587502623997-f8a7417849ba?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1049&q=80',
    },
    {
      title: 'Lorem ipsum dolor sit amet consecte2tur',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    },
  ];

  return (
    <div>
      {blogPost.map((post) => {
        return (
          <div className="border border-red-200" key={post.title}>
            <img className="w-2/6" src={post.image} alt="" />
            <h1>{post.title}</h1>

            <Link to={`/blog/${post.title.split(' ').join('-')}`}>
              Read Article
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Blog;
