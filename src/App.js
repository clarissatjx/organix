import "./App.css";
import Main from "./components/Main";
import User from "./components/Sidebar/User";
import AddNewTodo from "./components/Sidebar/AddNewTodo";
import Calendar from "./components/Sidebar/Calendar";
import Labels from "./components/Sidebar/Labels";
import Todos from "./components/Main/Todos";
import EditToDo from "./components/Main/EditTodo";
import Sidebar from "./components/Sidebar";
import Logo from "./components/Sidebar/Logo";

function App() {
  return (
    <div className="App">
      <Sidebar>
        <Logo />
        <User />
        <AddNewTodo />
        <Calendar />
        <Labels />
      </Sidebar>
      <Main>
        <Todos />
        <EditToDo />
      </Main>
    </div>
  );
}

export default App;
