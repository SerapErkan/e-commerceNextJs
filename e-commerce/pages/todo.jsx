import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/Todo.module.css";
const todo = () => {
  const [work, setWork] = useState("");
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState({
    total: 0,
    completed: 0,
    unCompleted: 0,
  });

  async function getAll() {
    const result = await axios.get("/api/todos/get");
    setTodos(result.data);
  }

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    setCounts();
  }, [todos]);

  async function submit() {
    const data = {
      work: work,
    };
    const result = await axios.post("api/todos/add", data);
    setWork("");
    getAll();
  }

  function handleChange(e) {
    setWork(e.target.value);
    if (!e.target.validity.valid) {
      console.log("hatalı giriş");
    }
    console.log(setWork);
  }
  async function remove(todo) {
    let result = confirm(`${todo.work} kaydını silmek istiyor musunuz?`);
    if (result) {
      await axios.post("/api/todos/remove", todo);
      getAll();
    }
  }

  async function changeStatus(todo) {
    let result = confirm(
      `${todo.work} kaydının durumunu değiştirmek istiyor musunuz?`
    );
    if (result) {
      await axios.post("/api/todos/changeStatus", {
        id: todo._id,
        isCompleted: todo.isCompleted,
      });
      getAll();
    }
  }

  function setCounts() {
    //  setCount(prev=> ({...prev ,["total"]:todos.length}));
    const completedCount = todos.filter((f) => f.isCompleted === true).length;
    const unCompletedCount = todos.filter(
      (f) => f.isCompleted === false
    ).length;

    setCount({
      total: todos.length,
      completed: completedCount,
      unCompleted: unCompletedCount,
    });
  }

  return (
    <>
      <div className="">
        <form onSubmit={submit}>
          <label htmlFor="work">Todo List</label>
          <input
            type="text"
            autoComplete="off"
            id="work"
            required
            minLength={3}
            value={work}
            onChange={handleChange}
          />

          <button type="submit">Kaydet</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Yapılacaklar</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{val.work}</td>
                  <td>
                    <button>x</button>
                    <button onClick={() => remove(val)}>sil</button>
                    <button onClick={() => changeStatus(val)}>güncelle</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div>
          <h3>total: {count.total}</h3>
          <h3>completed: {count.completed}</h3>
          <h3>unCompleted: {count.unCompleted}</h3>
        </div>
      </div>
    </>
  );
};

export default todo;
