import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { db } from '../../firebase';

const Blogpost = ({ match }) => {
  const [blogPost, setBlogPost] = useState({
    title: '',
    content: '',
    image: '',
  });

  const { title, content, image } = blogPost;
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await db
          .collection('blogpost')
          .where('slug', '==', match.params.slugId)
          .get();

        res.forEach((doc) => {
          const { content, title, image } = doc.data();
          setBlogPost({ ...blogPost, title, content, image });
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center mx-12">
      <h1 className="my-6 font-bold text-3xl">{title}</h1>
      <ReactMarkdown className="prose  w-full" source={content}></ReactMarkdown>
      <img src={image} className="w-3/6"></img>
    </div>
  );
};

export default Blogpost;
