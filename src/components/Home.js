import React from "react";
import Sidebar from "./Sidebar";
import Logo from "./Sidebar/Logo";
import User from "./Sidebar/User";
import AddNewTodo from "./Sidebar/AddNewTodo";
import Calendar from "./Sidebar/Calendar";
import Labels from "./Sidebar/Labels";
import Main from "./Main";
import Todos from "./Main/Todos";
import EditToDo from "./Main/EditTodo";

function Home() {
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

export default Home;
