import { useState, useEffect } from "react";
import { getCollectionRef, getDocumentRef, snapshot } from "../firebase";
import moment from "moment";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const collectionRef = getCollectionRef("tasks");
    let unsubscribe = snapshot(collectionRef, (ss) => {
      const data = ss.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      
      const sortedData = data.sort((a, b) => {
        const dateA = moment(a.date, 'DD/MM/YYYY');
        const dateB = moment(b.date, 'DD/MM/YYYY');
        return dateA - dateB; 
      });
      setTodos(sortedData);
    });
    return () => unsubscribe();
  }, []);

  return todos;
}

export function useLabels(tasks) {
  const [labels, setLabels] = useState([]);

  function calculateNumOfTasks(labelName, tasks) {
    const numOfTasks = tasks.filter((task) => task.label === labelName).length;
    return numOfTasks;
}

  useEffect(() => {
    const collectionRef = getCollectionRef("labels");
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
  }, [tasks]);

  return labels;
}
