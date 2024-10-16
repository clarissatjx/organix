import { useState, useEffect } from "react";
import { getCollectionRef, getDocumentRef, snapshot } from "../firebase";

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
      setTodos(data);
    });
    return () => unsubscribe();
  }, []);

  return todos;
}

export function useLabels(tasks) {
  const [labels, setLabels] = useState([]);

  function calculateNumOfTasks(labelName, tasks) {
    console.log(1);
    const numOfTasks = tasks.filter((task) => task.labelName === labelName).length;
    console.log(numOfTasks);
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
      setLabels(data);
    });

    return () => unsubscribe();
  }, []);

  return labels;
}
