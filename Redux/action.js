import axios from "axios";
const GET_TODO = "GET_TODO";

let getData = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/todos`)
      .then((res) => {
        dispatch(getTodos(res.data));
        // console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};

let AddTodo = (data) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:3000/todos`, {
        title: data,
      })
      .then((res) => {
        dispatch(getData());
      })
      .catch((error) => {
        dispatch(getData());
        console.error("Error adding todo:", error);
      });
  };
};

const patchData = (id, data) => (dispatch) => {
  console.log(id, data);
  try {
    axios
      .patch(
        `http://localhost:3000/todos/${id}`,
        { title: data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("hell");
        dispatch(getData());
      })
      .catch((error) => {
        dispatch(getData());
        console.error("Error updating todo:", error);
      });
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

let deleteTodo = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then((res) => {
        dispatch(getData());
      })
      .catch((error) => {
        dispatch(getData());
        console.error("Error deleting todo:", error);
      });
  };
};

let getTodos = (data) => {
  return {
    type: GET_TODO,
    payload: data,
  };
};

export { AddTodo, getTodos, getData, patchData, deleteTodo };
