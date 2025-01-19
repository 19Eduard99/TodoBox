import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import Item from "./Item";

const TodoBox = () => {
  const [state, setState] = useState({ text: "", id: "" });
  const [todos, setTodos] = useState([]);

  const inputHandler = (e) => {
    setState({ text: e.target.value, id: uuidv4() });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!state.text.trim()) {
      Swal.fire({
        title: "Ошибка!",
        text: "Поле не может быть пустым!",
        icon: "error",
        confirmButtonText: "Ок",
      });
      return;
    }

    setTodos([...todos, state]);

    setState({ text: "", id: "" });
  };

  const removeTodo = (id) => () => {
    Swal.fire({
      title: "Вы уверены?",
      text: "Вы не сможете отменить это действие!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Да, удалить!",
      cancelButtonText: "Отмена",
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos(todos.filter((todo) => todo.id !== id));
        Swal.fire({
          title: "Удалено!",
          text: "Задача была успешно удалена.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div className="mb-3">
        <form className="d-flex" onSubmit={submitHandler}>
          <div className="w-100 me-3">
            <input
              type="text"
              onChange={inputHandler}
              value={state.text}
              required=""
              className="form-control"
              placeholder="I am going..."
            />
          </div>
          <button type="submit" className="btn btn-primary">
            add
          </button>
        </form>
      </div>

      {todos.map((todo) => (
        <Item key={todo.id} task={todo} onRemove={removeTodo(todo.id)} />
      ))}
    </div>
  );
};

export default TodoBox;
