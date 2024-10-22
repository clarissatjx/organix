import React, { useState } from "react";
import { Plus } from "react-bootstrap-icons";
import Modal from "../../Modal";
import LabelForm from "./AddNewLabel/LabelForm";
import { getCollectionRef, add, getSubcollectionRef } from "../../../firebase";
import { getDocs, where, query } from "firebase/firestore";
import { useUser } from "../../../context/user";

function AddNewLabel() {
  const {username} = useUser();
  const [showModal, setShowModal] = useState(false);
  const [labelName, setLabelName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (labelName) {
      const ref = getSubcollectionRef(username, "labels");
      const q = query(ref, where("name", "==", labelName));

      getDocs(q)
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            add(ref, { name: labelName })
              .then(() => {
                setShowModal(false);
                setLabelName("");
                console.log("Label added successfully");
              })
              .catch((error) => {
                console.error("Error adding label: ", error);
              });
          } else {
            alert("Label already exists");
          }
        })
        .catch((error) => {
          console.error("Error fetching labels: ", error);
        });
    }
  }

  return (
    <div className="AddNewLabel">
      <div className="add-button">
        <span onClick={() => setShowModal(true)}>
          <Plus size="22" />
        </span>
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <LabelForm
          handleSubmit={handleSubmit}
          heading="New label"
          value={labelName}
          setValue={setLabelName}
          setShowModal={setShowModal}
          confirmButtonText={"+ Add Label"}
        />
      </Modal>
    </div>
  );
}

export default AddNewLabel;
