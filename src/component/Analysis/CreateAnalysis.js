import React, { useState } from 'react';
import { useEditor } from '../../contexts/EditorContext';
import { db } from '../../firebase';

const CreateAnalysis = ({}) => {
  const [content, setContent] = useState('');

  const { postData } = useEditor();

  const {id,title} = postData

  title.toLowerCase()

  const handleSubmit = async () => {
    try {
      const newAnalysis = await db.collection('analysis').add({
        SaaSId: id,
        title,
        content,
      });
      await db.collection('saas').doc(id).update({
        analysis: newAnalysis.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!id) {
    return <h1>Please Select your SaaS</h1>;
  }

  return (
    <div>
      <h2>Write Anaylsis For {title}</h2>
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

export default CreateAnalysis;
