import React from 'react'

const Post = ({match}) => {
  return <div>My post about {match.params.postId}</div>;
}

export default Post
