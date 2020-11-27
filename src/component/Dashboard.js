import firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { db } from '../firebase';
import Editor from './Editor';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addNewSaaS, setAddNewSaaS] = useState(false);
  const history = useHistory();

  const { saas, setSaas } = useData();

  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    category: '',
  });

  const { title, tagline, category } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await db.collection('saas').add({
        title,
        tagline,
        category,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
    setFormData({ ...formData, title: '', tagline: '', category: '' });
    // alert('Added!');
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = db
      .collection('saas')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        if (snapshot.size) {
          const list = [];
          snapshot.forEach((doc) => {
            const { title, tagline, category } = doc.data();

            list.push({
              id: doc.id,
              title,
              tagline,
              category,
              isEditable: false,
            });
          });
          setSaas(list);
          setLoading(false);
        } else {
          // it's empty
          alert('fetch data failed!');
          setLoading(false);
        }
      });
    return () => unsubscribe();

    // async function getData() {
    //   const snapshot = await db.collection('saas').get();
    //   if (snapshot.empty) {
    //     console.log('No matching documents.');
    //     return;
    //   }
    //   const data = [];
    //   snapshot.forEach((doc) => {
    //     data.push(doc.data());
    //   });
    //   setSaas(data);
    // }
    // getData();
  }, []);

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  const handleDelete = async (docId) => {
    try {
      await db.collection('saas').doc(docId).delete();
    } catch (error) {
      console.log(error);
    }
    // alert('Deleted!');
  };

  const handleUpdate = (id) => {
    const newSaas = saas.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          isEditable: !item.isEditable,
        };

        return updatedItem;
      }

      return item;
    });

    setSaas(newSaas);
  };

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <p> {currentUser.email}</p>
      <div className="flex flex-col">
        <button className="self-start" onClick={handleLogout}>
          Logout
        </button>
        <Link to="/update-profile">Update Profile</Link>
        <button
          onClick={() => setAddNewSaaS(!addNewSaaS)}
          className={
            'block bg-red-200 rounded-lg p-1 mt-4 w-32  self-end focus:outline-none ' +
            (addNewSaaS ? 'hidden' : 'block')
          }
        >
          Add new SaaS
        </button>
      </div>

      <h1 className="font-bold">
        Search among <span className="text-red-300">{saas.length}</span> SaaS
        company in our database
      </h1>
      <div
        className={
          'flex-col border-2 border-red-300 w-3/6 m-6 p-4 ' +
          (addNewSaaS ? 'block' : 'hidden')
        }
      >
        <h3 className="font-bold">Add new SaaS</h3>
        <p>Title:</p>
        <input
          className="border border-red-400 rounded-lg focus:outline-none"
          type="text"
          name="title"
          value={title}
          onChange={onChange}
        />

        <p>Tagline:</p>
        <input
          className="border border-red-400 rounded-lg focus:outline-none"
          type="text"
          name="tagline"
          value={tagline}
          onChange={onChange}
        />

        <p>Category:</p>
        <input
          className="border border-red-400 rounded-lg focus:outline-none"
          type="text"
          name="category"
          value={category}
          onChange={onChange}
        />
        <button
          onClick={onSubmit}
          className="block bg-red-200 rounded-lg p-1 mt-4 w-3/6 self-center focus:outline-none"
        >
          Submit
        </button>

        <button
          onClick={() => setAddNewSaaS(!addNewSaaS)}
          className="block bg-red-200 rounded-lg p-1 mt-4 w-3/6 self-center focus:outline-none"
        >
          Cancel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {saas.map((e) => {
          if (e.isEditable) {
            return <Editor key={() => uuidv4()} e={e} />;
          } else {
            return (
              <div
                key={e.id}
                className="flex flex-col border-2 border-blue-500 m-6 p-2 rounded-lg"
              >
                <h1 className="font-bold block">Title: </h1>
                <p>{e.title}</p>
                <h1 className="font-bold">Tagline:</h1>
                <p> {e.tagline}</p>
                <h1 className="font-bold">Category:</h1>
                <p> {e.category}</p>
                <p> {e.link}</p>
                <button
                  className="bg-red-200 rounded-lg p-1 w-16 self-end focus:outline-none"
                  onClick={() => handleDelete(e.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-red-200 rounded-lg p-1 self-end mt-4 w-16  focus:outline-none"
                  onClick={() => handleUpdate(e.id)}
                >
                  Edit
                </button>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Dashboard;
