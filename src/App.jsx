import TodoList from "./components/todoList";


function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#333",
      }}
    >
      <TodoList />
    </div>
  );
}

export default App;
