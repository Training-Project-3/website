import React from "react";
import EnquiryForm from "../../enquiryForm";
import UIModal from "../../reusable/UIModal";
import { useMutate } from "../../../Hooks/useMutate";
import { useNavigate, useParams } from "react-router-dom";
import { queryKey } from "../../../Constant/queryKey";
import { Link as ReactRouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setConfirmationModal,
  setShowEnquiryModal,
} from "../../../Redux/globalState";
import { Breadcrumbs, Divider, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { primaryColor } from "../../../Constant";
import DetailedProperty from "../../../Pages/properties/detailedProperty";
import { useIsFetched } from "../../../Hooks/useIsFetched";
import { useFetch } from "../../../Hooks/useFetch";

export const useProperty = () => {
  const EnquiryModal = () => {
    const dispatch = useDispatch();
    const { enquiryMutate, isEnquiryLoading } = useEnquiry();

    const showEnquiryModal = useSelector(
      (state) => state.globalState.showEnquiryModal
    );

    const handleCloseEnquiryModal = () => {
      dispatch(setShowEnquiryModal(false));
    };

    return (
      <UIModal
        open={showEnquiryModal}
        onClose={handleCloseEnquiryModal}
        closeButton
        size={"370px"}
      >
        <EnquiryForm
          enquiryMutate={enquiryMutate}
          isLoading={isEnquiryLoading}
        />
      </UIModal>
    );
  };

  const DetailedPropertyComponent = () => {
    const {
      enquiryMutate,
      isEnquiryLoading,
      property,
      isPropertyLoading,
      propertyId,
    } = useEnquiry();

    if (propertyId) {
      return (
        <div>
          <Breadcrumbs
            separator={
              <NavigateNextIcon
                fontSize="small"
                sx={{
                  marginX: "-6px",
                }}
              />
            }
            aria-label="breadcrumb"
            className="pb-2"
          >
            <Link
              className="font-semibold"
              component={ReactRouterLink}
              underline="hover"
              color="inherit"
              to="/"
            >
              Home
            </Link>
            <Link
              className="font-semibold"
              underline="hover"
              color={primaryColor}
              to={`/enquiry/${propertyId}`}
            >
              Property ID - {propertyId}
            </Link>
          </Breadcrumbs>

          <Divider
            sx={{
              marginY: ".5rem",
            }}
          />

          <DetailedProperty
            property={property}
            isPropertyLoading={isPropertyLoading}
            isEnquiryLoading={isEnquiryLoading}
            enquiryMutate={enquiryMutate}
          />
        </div>
      );
    } else {
      return <></>;
    }
  };

  return { DetailedPropertyComponent, EnquiryModal };
};

const useEnquiry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const confirmationModal = useSelector(
    (state) => state.globalState.confirmationModal
  );

  const { id: propertyId } = useParams();

  const onEnquirySuccess = (res) => {
    navigate("/");
    dispatch(setShowEnquiryModal(false));
    dispatch(
      setConfirmationModal({
        ...confirmationModal,
        open: true,
        message: res?.message,
        type: "success",
      })
    );
  };

  const onEnquiryError = (res) => {
    navigate("/");
    dispatch(setShowEnquiryModal(false));
    dispatch(
      setConfirmationModal({
        ...confirmationModal,
        open: true,
        message: res?.message,
        type: "error",
      })
    );
  };

  const { key: postkey, url: posturl } = queryKey.postEnquiry;

  const { mutate: enquiryMutate, isLoading: isEnquiryLoading } = useMutate(
    postkey,
    posturl,
    onEnquirySuccess,
    onEnquiryError
  );

  const { key, url } = queryKey.getPropertyById(propertyId);

  const isFetched = useIsFetched(key);

  const { data: property, isLoading: isPropertyLoading } = useFetch(
    key,
    url,
    () => {},
    () => {},
    !!propertyId && !isFetched, 
    (res) => res?.data.data
  );

  return {
    enquiryMutate,
    isEnquiryLoading,
    property,
    isPropertyLoading,
    propertyId,
  };
};
