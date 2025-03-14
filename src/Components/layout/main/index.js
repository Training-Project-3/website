import Alert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Styled from "styled-components";
import rightIcon from "../../../Images/right-icon.png";
import wrongIcon from "../../../Images/wrong-icon.png";
import { setConfirmationModal } from "../../../Redux/globalState";
import UIModal from "../../reusable/UIModal";
import Header from "../header";
import { useProperty } from "../useLayout/useProperty";
import ScrollToTop from "./scrollToTop";

const DasboardWrap = Styled.div`

@media screen and (min-width: 1200px) {
  padding: 0 10%;
}

`;

const Main = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const scrollRef = React.useRef(null);
  const confirmationModal = useSelector(
    (state) => state.globalState.confirmationModal
  );

  let offerDate = "03/05/2024"; // format --> MM/DD/YYYY

  useEffect(() => {
    const currentDate = new Date();
    const [month, day, year] = offerDate
      .split("/")
      .map((part) => parseInt(part, 10));
    const offerDateTime = new Date(year, month - 1, day);

    if (currentDate > offerDateTime) {
      setOpen(false);
    }
  }, []);

  const formatDate = (dateString) => {
    const dateParts = dateString.split("/");
    const month = parseInt(dateParts[0], 10);
    const day = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    const date = new Date(year, month - 1, day);

    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return formattedDate;
  };

  const handeGlobalModalClose = () => {
    dispatch(
      setConfirmationModal({
        ...confirmationModal,
        open: false,
        children: null,
      })
    );
  };

  const { EnquiryModal } = useProperty();

  return (
    <div>
      <Header />

      <EnquiryModal />

      <UIModal
        open={confirmationModal.open}
        onClose={handeGlobalModalClose}
        size={confirmationModal.size}
        header={confirmationModal.header}
        footer={confirmationModal.footer}
        closeButton={true}
        vPosition={confirmationModal.vPosition}
      >
        {confirmationModal.type === "success" && (
          <SuccessConfirmation message={confirmationModal.message} />
        )}

        {confirmationModal.type === "error" && (
          <ErrorConfirmation message={confirmationModal.message} />
        )}
      </UIModal>
      <DasboardWrap>
        <div style={{ marginBottom: "50px" }} className="p-4" ref={scrollRef}>
          <ScrollToTop scrollRef={scrollRef} />
          {open && (
            <Alert
              icon={false}
              className="mb-3"
              variant="filled"
              severity="warning"
            >
              Special offer: Get 20% off on creating new account! Limited Time
              Only. Hurry, This offer ends on {formatDate(offerDate)}, Don't
              miss out!
            </Alert>
          )}
          <Outlet />
        </div>
      </DasboardWrap>
    </div>
  );
};

export default Main;

const SuccessConfirmation = ({ message }) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center p-4">
      <img className="w-24" alt="success" src={rightIcon} />
      <span className="text-lg font-semibold">{message}</span>
    </div>
  );
};
const ErrorConfirmation = ({ message }) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center p-4">
      <img className="w-24" alt="success" src={wrongIcon} />
      <span className="text-lg font-semibold">{message}</span>
    </div>
  );
};
