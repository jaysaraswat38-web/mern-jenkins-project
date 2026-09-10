import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("/api/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  return (
    <div className="container">
      <h1>MERN Student Management</h1>

      <p className="subtitle">
        React + Node.js + Express + MongoDB
      </p>

      <h2>Student List</h2>

      {students.length > 0 ? (
        students.map((student) => (
          <div className="student" key={student.id}>
            <h3>{student.name}</h3>
            <p>Course: {student.course}</p>
          </div>
        ))
      ) : (
        <p>Loading students...</p>
      )}
    </div>
  );
}

export default App;
