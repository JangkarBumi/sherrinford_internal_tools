import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';

const CreateDetail = ({}) => {
  // const [content, setContent] = useState('');

  // const { postData } = useEditor();

  // const { id, title } = postData;

  const handleSubmit = async () => {
    try {
      const newPost = await db.collection('post').add({
        SaaSId: selectedId.id,
        title: 'My first details',
        content: 'My first details',
        slug: selectedId.title.split(' ').join('').toLowerCase(),
      });
      await db.collection('saas').doc(selectedId.id).update({
        details: newPost.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDetail = async (detailId) => {
    try {
      await db.collection('post').where('SaaSId', '==', detailId).delete();
    } catch (error) {
      console.log(error);
    }
  };

  const [saasList, setSaasList] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [loading, setLoading] = useState(true);
  const [detail, setDetails] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await db.collection('saas').get();

        let holder = [];
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

        res = await db.collection('post').get();

        holder = [];
        res.forEach((doc) => {
          const { slug } = doc.data();
          holder.push({ slug });
        });
        setDetails(holder);
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
          setSelectedId(saasList.find((saas) => saas.title === e.target.value));
        }}
      >
        {saasList.map((e) => (
          <option key={e.id} value={e.title}>
            {e.title}
          </option>
        ))}
      </select>

      <button
        className="mt-6 block bg-red-200 rounded-lg p-2  mt-4   focus:outline-none"
        onClick={handleSubmit}
      >
        Create SaaS details
      </button>

      <div className="mt-6">
        {detail.map((e) => {
          return (
            <div key={e.slug} className=" flex justify-between">
              <Link to={`/edit-blogpost/`}>{e.slug}</Link>
              <button onClick={() => deleteDetail(e.id)}>Delete</button>
              {/*  <Link
              to={`/edit-blogpost/${e.id}`}
              className="bg-red-200 rounded-lg p-2  mt-4 w-16  focus:outline-none"
            >
              Edit
            </Link> */}
            </div>
          );
        })}
      </div>

      {/* <h2>Write Anaylsis For {title}</h2>
      <input
        className="block"
        type="text"
        value={content}
        placeholder="type here"
        onChange={(e) => setContent(e.target.value)}
      />
      */}
    </div>
  );
};

export default CreateDetail;
