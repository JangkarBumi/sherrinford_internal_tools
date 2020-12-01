import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { toast, ToastContainer } from 'react-toastify';
import { app, db } from '../../firebase';

const EditBlogpost = ({ match }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');

  const [fileUrl, setFileUrl] = React.useState(null);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  useEffect(() => {
    db.collection('blogpost')
      .doc(match.params.blogPostId)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          const { title, content, slug } = doc.data();
          setTitle(title);
          setContent(content);
          setSlug(slug);
        } else {
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }, []);

  const handleSubmit = async (id) => {
    try {
      await db
        .collection('blogpost')
        .doc(id)
        .update({ title, content, slug, image: fileUrl });
      toast.success('🎉 Your changes have been saved!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to save changes');
    }
  };

  return (
    <div>
      Edit Blogpost
      <button
        className="block bg-red-200 rounded-lg p-2  mt-4 w-16  focus:outline-none"
        onClick={() => handleSubmit(match.params.blogPostId)}
      >
        Submit
      </button>
      <h3>Title:</h3>
      <input
        className="block m-4"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h3>Slug:</h3>
      <input
        className="block m-4"
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
      <h3>Upload Image:</h3>
      <input type="file" onChange={onFileChange} />
      <button onClick={() => console.log(fileUrl)}>Upload</button>

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

export default EditBlogpost;
