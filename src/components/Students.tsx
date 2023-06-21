import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface Student {
  id: string;
  name: string;
  lastName: string;
  genero: string;
}

function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState<Student>({
    id: "",
    name: "",
    lastName: "",
    genero: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setNewStudent((prevStudent) => ({ ...prevStudent, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newStudentWithId = { ...newStudent, id: uuidv4() };
      const response = await fetch("http://localhost:3000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudentWithId),
      });
      const data = await response.json();
      setStudents((prevStudents) => [...prevStudents, data]);
      setNewStudent({ id: "", name: "", lastName: "", genero: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/students/${id}`, {
        method: "DELETE",
      });
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id: string) => {};

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={newStudent.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Apellido:</label>
            <input
              type="text"
              id="lastName"
              value={newStudent.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="genero">Género:</label>
            <select
              id="genero"
              value={newStudent.genero}
              onChange={handleInputChange}
            >
              <option value="">Seleccione</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </div>
          <button type="submit">Agregar</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.lastName}</td>
              <td>{student.genero}</td>
              <td>
                <button onClick={() => handleDelete(student.id)}>
                  Eliminar
                </button>
                <button onClick={() => handleEdit(student.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
