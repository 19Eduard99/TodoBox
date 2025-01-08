import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import Item from "./Item";

class TodoBox extends Component {
  state = {
    todo: { text: "", id: "" },
    todos: [],
  };

  handleChange = (e) => {
    this.setState(() => ({
      todo: { text: e.target.value, id: uuidv4() },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.todo.text.trim()) {
      Swal.fire({
        title: "Ошибка!",
        text: "Поле не может быть пустым!",
        icon: "error",
        confirmButtonText: "Ок",
      });
      return;
    }

    this.setState((prevState) => ({
      todo: { text: "", id: "" },
      todos: [prevState.todo, ...prevState.todos],
    }));
  };

  removeTodo = (id) => () => {
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
        this.setState((prevState) => ({
          todos: prevState.todos.filter((todo) => todo.id !== id),
        }));
        Swal.fire({
          title: "Удалено!",
          text: "Задача была успешно удалена.",
          icon: "success",
        });
      }
    });
  };

  render() {
    const { text } = this.state.todo;

    return (
      <div>
        <div className="mb-3">
          <form onSubmit={this.handleSubmit} className="d-flex">
            <div className="w-100 me-3">
              <input
                type="text"
                onChange={this.handleChange}
                value={text || ""}
                required=""
                className="form-control"
                placeholder="I am going..."
              />
            </div>
            <button className="btn btn-primary">add</button>
          </form>
        </div>

        {this.state.todos.map((todo) => (
          <Item key={todo.id} task={todo} onRemove={this.removeTodo(todo.id)} />
        ))}
      </div>
    );
  }
}

export default TodoBox;
