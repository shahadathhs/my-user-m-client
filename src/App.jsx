import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  } , []);

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name , email }
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log("Inside POST:", data);

      const newUsers = [ ...users, data]
      setUsers(newUsers)
      form.reset();
    })
  }

  return (
    <>
      <h1>User Management System</h1>
      <p>My User Management + My User M Client</p>
      <p>Numbers of users {users.length}</p>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" placeholder='Your Name' />
        <br />
        <input type="email" name="email" id="" placeholder='Your Email' />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <div>
        {
          users.map(user => 
          <p key={user.id}>
            {user.id} : {user.name} : {user.email}
          </p>)
        }
      </div>
    </>
  )
}

export default App
