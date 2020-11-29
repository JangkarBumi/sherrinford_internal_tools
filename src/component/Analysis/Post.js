import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';

const Post = ({ match }) => {
  const [content, setContent] = useState();

  useEffect(() => {
    const getData = () => {
      db.collection('analysis')
        .where('title', '==', match.params.postId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setContent(doc.data().content);
          });
        });
    };
    getData();
  }, []);

  return <div>{content}</div>;
};

export default Post;
