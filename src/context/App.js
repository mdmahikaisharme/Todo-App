import { createContext, useReducer } from "react";

const AppInitialSate = {
	isDarkTheme: false,
	currentTab: "all",
	todos: [
		{id: 0, name: "Complete online JavaScript course", done: true},
		{id: 1, name: "Jog around the park 3x", done: false},
		{id: 2, name: "10 minutes medition", done: false},
		{id: 3, name: "Read for 1hour", done: false},
		{id: 4, name: "Pick up groceries", done: false},
		{id: 5, name: "Complete Todo App on Frontend Mentor", done: false},
	],
	dispatch: () => {},
};
const AppContext = createContext(AppInitialSate);

function AppReducer(state, { type, payload }) {
	switch (type) {
		case "TOGGLE_THEME": {
			return { ...state, isDarkTheme: !state.isDarkTheme };
		}
		case "TOGGLE_TAB": {
			return { ...state, currentTab: payload };
		}
		case "TOGGLE_TODO_DONE": {
			// payload = id
			const newTodos = state.todos.map((item) => 
				item.id === payload ? { ...item, done: !item.done } : item
			);
			return { ...state, todos: newTodos };
		}
		case "ADD_TODO": {
			// payload = todo
			return { ...state, todos: [ ...state.todos, payload ] };
		}
		case "REMOVE_TODO": {
			// payload = id
			const newTodos = state.todos.filter((item) => item.id !== payload);
			return { ...state, todos: newTodos };
		}
		case "CLEAR_COMPLETED_TODO": {
			// payload = id
			const newTodos = state.todos.filter((item) => !item.done);
			return { ...state, todos: newTodos };
		}
		default: {
			return state;
		}
	}
}

function AppContextProvider({ children }) {
	const [state, dispatch] = useReducer(AppReducer, AppInitialSate);

	return (
		<AppContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
}

export { AppContext, AppContextProvider };
