import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';

const CreatePost = ({}) => {
  // const [content, setContent] = useState('');

  // const { postData } = useEditor();

  // const { id, title } = postData;

  // title.toLowerCase();

  // const handleSubmit = async () => {
  //   try {
  //     const newPost = await db.collection('post').add({
  //       SaaSId: id,
  //       title,
  //       content,
  //     });
  //     await db.collection('saas').doc(id).update({
  //       post: newPost.id,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [saasList, setSaasList] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await db.collection('saas').get();

        const holder = [];
        res.forEach((doc) => {
          const { title } = doc.data();
          holder.push({ title, id: doc.id });
        });
        setSaasList(holder);
        holder.unshift({
          title: 'Select Saas',
          id: 'lorem',
        });
        setSelectedId(holder[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <label className="block mt-6">Choose a SaaS:</label>

      <select
        value={selectedId.title}
        onChange={(e) => {
          setSelectedId(saasList.find((saas) => saas.title == e.target.value));
        }}
      >
        {saasList.map((e) => (
          <option key={e.id} value={e.title}>
            {e.title}
          </option>
        ))}
      </select>

      {/* <h2>Write Anaylsis For {title}</h2>
      <input
        className="block"
        type="text"
        value={content}
        placeholder="type here"
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Post now!</button> */}
    </div>
  );
};

export default CreatePost;
