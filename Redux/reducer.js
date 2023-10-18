const initialState = {
  todos: [],
};

const ADD_TODO = "ADD_TODO";
const GET_TODO = "GET_TODO";

// Reducer function
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case GET_TODO:
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
