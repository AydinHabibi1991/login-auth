import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import UserForm from "./components/UserForm";
import Header from "./components/Header";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role") === "admin";
  const [users, setUsers] = useState([]);

  const addUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]); // Simulate ID generation
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/users"
          element={isAuthenticated ? <UserList users={users} addUser={addUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/users/:id"
          element={isAuthenticated ? <UserDetail /> : <Navigate to="/" />}
        />
        <Route
          path="/users/create"
          element={isAdmin ? <UserForm addUser={addUser} /> : <Navigate to="/users" />}
        />
        <Route
          path="/users/edit/:id"
          element={isAdmin ? <UserForm addUser={addUser} /> : <Navigate to="/users" />}
        />
      </Routes>
    </Router>
  );
};

export default App;