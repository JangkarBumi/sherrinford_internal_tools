import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';

const Blog = () => {
  const [blogPost, setBlogPost] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await db.collection('blogpost').get();

        const holder = [];
        res.forEach((doc) => {
          const { content, title, slug, image } = doc.data();
          holder.push({ id: doc.id, title, content, slug, image });
        });

        setBlogPost(holder);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  // const blogPost = [
  //   {
  //     title: 'Lorem ipsum dolor sit amet consectetur',
  //     image:
  //       'https://images.unsplash.com/photo-1587502623997-f8a7417849ba?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1049&q=80',
  //   },
  //   {
  //     title: 'Lorem ipsum dolor sit amet consecte2tur',
  //     image:
  //       'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
  //   },
  // ];

  return (
    <div className="flex flex-col">
      {blogPost.map((post) => {
        return (
          // <ReactMarkdown
          //   key={post.id}
          //   className="prose border border-gray-500"
          //   source={post.content}
          // ></ReactMarkdown>
          <div className="border border-red-200 mt-6" key={post.id}>
            <h1>{post.title}</h1>
            <img className="block w-2/6" src={post.image} alt="" />

            <Link to={`/blog/${post.slug}`}>Read Article</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Blog;
