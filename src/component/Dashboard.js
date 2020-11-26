import firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useData } from '../contexts/DataContext';
import { auth, db } from '../firebase';
import Editor from './Editor';

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
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
    setLoading(true);
    db.collection('saas')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
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
      });
  }, []);

  const signin = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

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
    return <h1>Loading...</h1>;
  }

  if (currentUser) {
    return (
      <div>
        {currentUser.email}
        <p></p>
        <button onClick={() => auth.signOut()}>Logout</button>{' '}
        <Link to="/update-profile">Update Profile</Link>
        <h1 className="font-bold">
          Search among <span className="text-red-300">{saas.length}</span> SaaS
          company in our database
        </h1>
        <div className="flex flex-col border-2 border-red-300 w-3/6 m-6 p-4">
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
        </div>
        {saas.map((e) => {
          if (e.isEditable) {
            return <Editor key={() => uuidv4()} e={e} />;
          } else {
            return (
              <div
                key={e.id}
                className="flex flex-col border-2 border-blue-500 m-6 w-3/6 p-2 rounded-lg"
              >
                <h1 className="font-bold block">Title: </h1>
                <p>{e.title}</p>
                <h1 className="font-bold">Tagline:</h1>
                <p> {e.tagline}</p>
                <h1 className="font-bold">Category:</h1>
                <p> {e.category}</p>
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
    );
  }

  return (
    <div>
      <button onClick={() => signin('zehairawan@gmail.com', '001212mn')}>
        Login
      </button>
    </div>
  );
};

export default Dashboard;
