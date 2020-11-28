import React from 'react';

const BlogPost = ({ match }) => {
  return (
    <div>
      <div>My post about {match.params.blogPostId}</div>
    </div>
  );
};

export default BlogPost;
