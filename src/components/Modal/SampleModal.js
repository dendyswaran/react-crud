import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import PrimaryHeader from "../Header/PrimaryHeader";
import PopUpTable from "../Table/PopUpTable";
import SecondaryButton from "../Button/SecondaryButton";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const SampleModal = ({ state }) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="pb-4 grid grid-cols-12">
      <div className="lg:col-start-10 lg:col-span-3 col-start-7 col-span-6">
          <SecondaryButton
            // disabled={isLoading}
            onClick={openModal}
            label={"Site ID " + state.cd}
            icon="pi pi-info-circle"
          />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        className="mt-36 px-2 py-0 bg-white shadow-lg w-4/5 mx-auto "
        contentLabel="Example Modal"
      >
        <PopUpTable state={state} />
      </Modal>
    </div>
  );
};
export default SampleModal;
