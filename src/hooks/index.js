import { useState, useEffect } from "react";
import {
  createCollection,
  getCollectionRef,
  getDocumentRef,
  getSubcollectionRef,
  snapshot,
} from "../firebase";
import moment from "moment";
import { useUser } from "../context/user";

export function useTodos() {
  const { username } = useUser(); // Get the current user's username
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log(username);
    if (!username) return; // Exit early if no username is available

    const collectionRef = getSubcollectionRef(username, "tasks");
    console.log(collectionRef);
    console.log("hi");
    let unsubscribe = snapshot(collectionRef, (ss) => {
      const data = ss.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const sortedData = data.sort((a, b) => {
        const dateA = moment(a.date, "DD/MM/YYYY");
        const dateB = moment(b.date, "DD/MM/YYYY");
        return dateA - dateB;
      });
      setTodos(sortedData);
    });
    return () => unsubscribe();
  }, [username]);

  return todos;
}

export function useLabels(tasks) {
  const { username } = useUser(); // Get the current user's username
  const [labels, setLabels] = useState([]);

  function calculateNumOfTasks(labelName, tasks) {
    const numOfTasks = tasks.filter((task) => task.label === labelName).length;
    return numOfTasks;
  }

  useEffect(() => {
    if (!username) return; // Exit early if no username is available

    const collectionRef = getSubcollectionRef(username, "labels");
    let unsubscribe = snapshot(collectionRef, (shot) => {
      const data = shot.docs.map((doc) => {
        const labelName = doc.data().name;
        return {
          id: doc.id,
          name: labelName,
          numOfTasks: calculateNumOfTasks(labelName, tasks),
        };
      });
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
      setLabels(sortedData);
    });

    return () => unsubscribe();
  }, [username, tasks]);

  return labels;
}
