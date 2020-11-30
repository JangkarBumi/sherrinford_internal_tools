import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { db } from '../../firebase';

const CreateBlogpost = () => {
  const [blogPost, setBlogPost] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('blogpost').onSnapshot((snapshot) => {
      if (snapshot.size) {
        const list = [];
        snapshot.forEach((doc) => {
          const { title } = doc.data();

          list.push({
            id: doc.id,
            title,
          });
        });
        setBlogPost(list);
      } else {
        // it's empty
      }
    });
    return () => unsubscribe();
  }, []);

  const createBlogPost = async (title) => {
    await db.collection('blogpost').add({
      title: title,
      content: '',
      slug: title.toLowerCase().split(' ').join('-'),
      heroImage: '',
    });
  };

  const deleteBlogPost = async (blogPostId) => {
    try {
      await db.collection('blogpost').doc(blogPostId).delete();
    } catch (error) {
      console.log(error);
    }
  };

  const [title, setTitle] = useState('');

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (title) {
            setTitle('');
            createBlogPost(title);
          }
        }}
      >
        <input
          type="text"
          placeholder="Your new blogpost title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
      {blogPost.map((e) => {
        return (
          <div key={e.title} className="flex justify-between">
            <Link to={`/edit-blogpost/${e.id}`}>{e.title}</Link>
            <button onClick={() => deleteBlogPost(e.id)}>Delete</button>
            <Link
              to={`/edit-blogpost/${e.id}`}
              className="bg-red-200 rounded-lg p-2  mt-4 w-16  focus:outline-none"
            >
              Edit
            </Link>
          </div>
        );
      })}

      <ToastContainer />
    </div>
  );
};

export default CreateBlogpost;
