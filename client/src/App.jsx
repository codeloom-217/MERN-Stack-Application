import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const API_URL = "http://localhost:5000/api/students";

function App() {
  const [students, setStudents] = useState([]);

  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    age: ""
  });

  const [editingId, setEditingId] = useState(null);

  // GET - Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  // Fetch students when page loads
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStudents();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // UPDATE
        await axios.put(`${API_URL}/${editingId}`, student);

        alert("Student updated successfully!");
      } else {
        // CREATE
        await axios.post(API_URL, student);

        alert("Student added successfully!");
      }

      // Clear form
      setStudent({
        name: "",
        email: "",
        course: "",
        age: ""
      });

      setEditingId(null);

      // Refresh student list
      fetchStudents();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  // EDIT
  const handleEdit = (student) => {
    setStudent({
      name: student.name,
      email: student.email,
      course: student.course,
      age: student.age
    });

    setEditingId(student._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);

      alert("Student deleted successfully!");

      fetchStudents();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete student"
      );
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setStudent({
      name: "",
      email: "",
      course: "",
      age: ""
    });

    setEditingId(null);
  };

  return (
    <div className="app">

      {/* HEADER */}
      <div className="page-header">
        <div className="icon">🎓</div>

        <h1>Student Management System</h1>

        <p>
          Add, view, update and delete students
        </p>
      </div>


      {/* FORM */}
      <div className="card form-card">

        <h2>
          {editingId ? "Edit Student" : "Add New Student"}
        </h2>

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


          <div className="form-buttons">

            <button type="submit">
              {editingId ? "Update Student" : "Add Student"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}

          </div>

        </form>
      </div>


      {/* STUDENT LIST */}
      <div className="card students-card">

        <div className="students-header">
          <div>
            <h2>All Students</h2>

            <p>
              {students.length} student
              {students.length !== 1 ? "s" : ""} registered
            </p>
          </div>
        </div>


        {students.length === 0 ? (

          <div className="empty">
            <div className="empty-icon">📋</div>

            <h3>No students yet</h3>

            <p>
              Add your first student using the form above.
            </p>
          </div>

        ) : (

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {students.map((student) => (

                  <tr key={student._id}>

                    <td className="student-name">
                      {student.name}
                    </td>

                    <td>
                      {student.email}
                    </td>

                    <td>
                      {student.course}
                    </td>

                    <td>
                      {student.age}
                    </td>

                    <td>

                      <div className="actions">

                        <button
                          className="edit-button"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDelete(student._id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default App;