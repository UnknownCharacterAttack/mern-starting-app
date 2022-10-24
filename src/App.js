import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [listOfFriends, setListOfFriends] = useState([]);

  const addFriend = () => {
    axios.post('http://localhost:3001/addfriend', { name, age }).then((res) => {
      setListOfFriends([...listOfFriends, { _id: res.data._id, name, age }]);
    });

    setName('');
    setAge('');
  };

  useEffect(() => {
    console.log('is it me');
    axios
      .get('http://localhost:3001/read')
      .then((res) => {
        setListOfFriends(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateFriend = (id) => {
    const newAge = Number(prompt('Enter new Age: '));
    axios.patch('http://localhost:3001/update', { newAge, id }).then(() => {
      setListOfFriends(
        listOfFriends.map((friend) =>
          friend._id === id ? { ...friend, age: newAge } : friend
        )
      );
    });
  };

  const deleteFriend = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setListOfFriends(listOfFriends.filter((friend) => friend._id !== id));
    });
  };

  return (
    <div className='App'>
      <div className='inputs'>
        <input 
          type='text'
          placeholder='Friend name...'
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <input
          type='number'
          placeholder='Friend age...'
          onChange={(event) => setAge(event.target.value)}
          value={age}
        />
        <button onClick={addFriend}>Add Friend</button>
      </div>
      <div className='listOfFriends'>
        {listOfFriends.map((friend) => (
          <div className='friendContainer'>
            <div className='friend'>
              <h3>Name: {friend.name}</h3>
              <h3>Age: {friend.age}</h3>
            </div>
            <button onClick={() => updateFriend(friend._id)}>Update</button>
            <button id='removeBtn' onClick={() => deleteFriend(friend._id)}>
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
