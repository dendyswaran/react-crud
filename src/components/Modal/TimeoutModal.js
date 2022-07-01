import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import PrimaryHeader from "../Header/PrimaryHeader";
import PopUpTable from "../Table/PopUpTable";
import SecondaryButton from "../Button/SecondaryButton";
import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import ClockIcon from "../SVG/ClockIcon";
import useCountdown from "../CustomHook/useCountdown";

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

const TimeoutModal = ({ state, isTimeout, timeoutLogout }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const [days, hours, minutes, seconds] = useCountdown(startTime);

  // TODO: fix the 1 second delay problem. --> or dont use this approach at all
  useEffect(() => {
    setStartTime(() => new Date().getTime() + timeoutLogout);

    // need to reset the countdown timer here
  }, [isTimeout]);

  useEffect(() => {
    setIsOpen(() => isTimeout);
  }, [startTime]);

  // // TODO: instead of open with onClick event we will open with timeout in
  // function openModal() {
  //   setIsOpen(true);
  // }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    // TODO: set idle to false "handleStayLoggedIn"
    setIsOpen(false);
  }
  return (
    <div className="pb-4 grid grid-cols-12">
      {/* <div className="lg:col-start-10 lg:col-span-3 col-start-7 col-span-6">
        <SecondaryButton
          // disabled={isLoading}
          onClick={openModal}
          label={"Site ID "}
          icon="pi pi-info-circle"
        />
      </div> */}

      {seconds > 0 && (
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          // style={customStyles}
          className="mt-36 px-2 py-0 bg-white shadow-lg w-4/5 lg:w-1/3 mx-auto "
          contentLabel="Example Modal"
        >
          <div className="container p-8">
            <PrimaryHeader
              primary="Are you still there?"
              secondary={`If not, we'll close this session in ${seconds} Seconds.`}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};
export default TimeoutModal;
