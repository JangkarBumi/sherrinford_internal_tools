import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { toast, ToastContainer } from 'react-toastify';
import { db } from '../firebase';

const WriteBlogPost = () => {
  const [content, setContent] = useState('Do your thing!');
  const [title, setTitle] = useState('');

  const handleSubmit = async () => {
    try {
      await db
        .collection('blogpost')
        .doc('riMud2Wq6xh5a1PQ8ZPo')
        .update({ content });
      toast.success('🎉 Your changes have been saved!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to save changes');
    }
  };

  return (
    <div>
      WriteBlogPost
      <button className="block" onClick={handleSubmit}>
        Post now!
      </button>
      <input
        className="block m-4"
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex">
        <textarea
          className="block border border-gray-500 w-3/6"
          type="text"
          value={content}
          placeholder="type here"
          onChange={(e) => setContent(e.target.value)}
        />
        <ReactMarkdown
          className="prose w-3/6 border border-gray-500"
          source={content}
        ></ReactMarkdown>
      </div>
      <ToastContainer />
    </div>
  );
};

export default WriteBlogPost;
