import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Logo from "./Sidebar/Logo";
import User from "./Sidebar/User";
import AddNewTodo from "./Sidebar/AddNewTodo";
import Calendar from "./Sidebar/Calendar";
import Labels from "./Sidebar/Labels";
import Main from "./Main";
import Todos from "./Main/Todos";
import EditToDo from "./Main/EditTodo";
import { useUser } from "../context/user";
import { Navigate, useNavigate } from "react-router-dom";

function Home() {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn); // Log the value of isLoggedIn
    if (!isLoggedIn) {
      console.log("redirect")
      navigate("/login", { replace: true}); // Redirect to home if logged in
    }
  }, [isLoggedIn]);

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
