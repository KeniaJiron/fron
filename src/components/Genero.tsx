import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Genero.css";
interface Genero {
  id: string;
  nombre: string;
}

function Gender() {
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [newGenero, setNewGenero] = useState<Genero>({
    id: "",
    nombre: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/genero");
      const data = await response.json();
      setGeneros(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setNewGenero((prevGenero) => ({ ...prevGenero, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newGeneroWithId = { ...newGenero, id: uuidv4() };
    try {
      const response = await fetch("http://localhost:3000/generos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGeneroWithId),
      });
      const data = await response.json();
      setGeneros((prevGeneros) => [...prevGeneros, data]);
      setNewGenero({ id: "", nombre: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/genero/${id}`, {
        method: "DELETE",
      });
      setGeneros((prevGeneros) =>
        prevGeneros.filter((genero) => genero.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id: string) => {
    // Aquí puedes implementar la lógica para editar un género
  };

  return (
    <div className="genero-container">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={newGenero.nombre}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Agregar</button>
        </form>
      </div>
      <table className="genero-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.map((genero) => (
            <tr key={genero.id}>
              <td>{genero.nombre}</td>
              <td>
                <button onClick={() => handleDelete(genero.id)}>
                  Eliminar
                </button>
                <button onClick={() => handleEdit(genero.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Gender;
