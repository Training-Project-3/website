import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  alertMessage: "",
  showEnquiryModal: false,
  packagePercent: [0, 100],
  LastEvaluatedKey: 0,
  property: [],
  tempProperty: [],
  filtered: false,
  filteredData: [],
  propertyFilter: {
    // propertName: "",
    location: "",
    noOfBedrooms: "",
    category: "",
    packagePrice: {
      min: 0,
      max: 10000000,
    },
  },
  filterArray: {
    filterarray: [
      { label: "condition", status: true, value: "All" },
      { label: "country", status: false, value: [] },
      { label: "propertytype", status: false, value: [] },
      { label: "amount", status: false, value: [] },
      { label: "contractType", status: false, value: [] },
    ],
  },
  filtered: false,
  confirmationModal: {
    open: false,
    size: "440px",
    header: "",
    footer: "",
    vPosition: "center",
    message: "",
    type: "",
  },
};

export const globalState = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload;
      toast(action.payload.message, {
        type: action.payload.type,
        position: action.payload.position || "top-center",
      });
    },
    setShowEnquiryModal: (state, action) => {
      state.showEnquiryModal = action.payload;
    },
    setPropertyFilter: (state, action) => {
      state.propertyFilter = action.payload;
    },
    setProperty: (state, action) => {
      state.property = action.payload;
    },
    setTempProperty: (state, action) => {
      state.tempProperty = action.payload;
    },
    setPackagePercent: (state, action) => {
      state.packagePercent = action.payload;
    },
    setConfirmationModal: (state, action) => {
      state.confirmationModal = action.payload;
    },
    setLastEvaluatedKey: (state, action) => {
      state.LastEvaluatedKey = action.payload;
    },
    setFiltered: (state, action) => {
      state.filtered = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    setFilterArray: (state, action) => {
      state.filterArray = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAlertMessage,
  setFilterArray,
  setPropertyFilter,
  setConfirmationModal,
  setPackagePercent,
  setShowEnquiryModal,
  setLastEvaluatedKey,
  setTempProperty,
  setProperty,
  setFiltered,
  setFilteredData,
} = globalState.actions;

export default globalState.reducer;
