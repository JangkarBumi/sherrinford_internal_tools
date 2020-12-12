import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';

const Detail = ({ match }) => {
  const [content, setContent] = useState();

  useEffect(() => {
    const getData = () => {
      db.collection('post')
        .where('slug', '==', match.params.slugId)
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

export default Detail;
