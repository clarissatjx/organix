import React, { useState } from 'react'
import { Plus } from 'react-bootstrap-icons';
import Modal from "../../Modal";
import LabelForm from './AddNewLabel/LabelForm';

function AddNewLabel() {
    const [showModal, setShowModal] = useState(false);
    const [labelName, setLabelName] = useState("");

    function handleSubmit(e) {

    }

    return (
        <div className='AddNewLabel'>
            <div className='add-button'>
                <span onClick={() => setShowModal(true)}>
                    <Plus size='22'/>
                </span>
            </div>

            <Modal showModal={showModal} setShowModal={setShowModal}>
                <LabelForm 
                    handleSubmit={handleSubmit}
                    heading='New label'
                    value={labelName}
                    setValue={setLabelName}
                    setShowModal={setShowModal}
                    confirmButtonText={"+ Add Label"}
                />
            </Modal>
        </div>
    )
}

export default AddNewLabel;