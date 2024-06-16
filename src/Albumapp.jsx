import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlbumApp = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({ userId: 1, title: ''});

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      console.log('Fetching albums...');
      const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
      setAlbums(response.data);
      console.log('Fetched albums:', response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const addAlbum = async () => {
    await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: newAlbum.title,
      body: newAlbum.title,
      userId: 1,
    }, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
       console.log(response.data)
       setAlbums([response.data,...albums])
       newAlbum.title = ""
      })
      .catch(error => {
        console.error('There was an error making the request:', error);
      });
  };

  const updateAlbum = async (id, updatedTitle,userId) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        id : id,
        title: updatedTitle,
        body : updatedTitle,
        userId : userId
      });
      setAlbums(albums.map(album => (album.id === id ? response.data : album)));
      console.log('Updated album:', response.data);
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  const deleteAlbum = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setAlbums(albums.filter(album => album.id !== id));
      console.log(`Deleted album with id ${id}`);
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Albums</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="New album title"
          value={newAlbum.title}
          onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <button
          onClick={addAlbum}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Album
        </button>
      </div>
      <ul className="list-disc pl-5">
        {albums.map(album => (
          <li key={album.id} className="mb-2">
            <span className="mr-2">{album.title}</span>
            <button
              onClick={() => updateAlbum(album.id, prompt('New title:', album.title))}
              className="bg-yellow-500 text-white p-1 rounded mr-2 hover:bg-yellow-600"
            >
              Update
            </button>
            <button
              onClick={() => deleteAlbum(album.id)}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumApp;
