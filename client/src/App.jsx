
import { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    age: ""
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/students",
        student
      );

      alert("Student added successfully!");

      setStudent({
        name: "",
        email: "",
        course: "",
        age: ""
      });
     } catch (error) {
  console.log("ERROR:", error);
  console.log("SERVER RESPONSE:", error.response?.data);

  alert(
    error.response?.data?.message ||
    "Failed to add student"
  );
}
  };

  return (
    <div className="app">
      <div className="card">

        <div className="header">
          <div className="icon">🎓</div>
          <h1>Student Management</h1>
          <p>Add a new student to the system</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter student's name"
              value={student.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="student@example.com"
              value={student.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Course</label>
            <input
              type="text"
              name="course"
              placeholder="e.g. Information Technology"
              value={student.course}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              placeholder="Enter age"
              value={student.age}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">
            Add Student
          </button>

        </form>
      </div>
    </div>
  );
}

export default App;
