import React, { useEffect, useState } from 'react';
import { useEditor } from '../../contexts/EditorContext';
import { db } from '../../firebase';

const EditDetail = () => {
  const [content, setContent] = useState('');

  const { docId } = useEditor();

  useEffect(() => {
    const getData = () => {
      db.collection('post')
        .doc(docId)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log('Document data:', doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });
    };
    getData();
  }, []);

  const handleSubmit = async () => {
    try {
      await db.collection('post').doc(docId).update({
        content,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!docId) {
    return <h1>Please Select your SaaS</h1>;
  }

  return (
    <div>
      <h2>Editing Anaylsis For {docId}</h2>
      <input
        className="block"
        type="text"
        value={content}
        placeholder="type here"
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Post now!</button>
    </div>
  );
};

export default EditDetail;
