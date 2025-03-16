export const baseApiUrl =
  "https://ozn31ermlc.execute-api.ap-south-1.amazonaws.com/dev";

export const primaryColor = "#808000";

export const phoneRegExp = /^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const conditionOptions = [
  { value: "All", label: "All" },
  { value: "New", label: "New" },
  { value: "Used", label: "Used" },
];

export const propertyTypeFilterOptions = [
  { value: "Apartment", label: "Apartment" },
  { value: "Independent Floor", label: "Independent Floor" },
  { value: "Independent House", label: "Independent House" },
  { value: "Villa", label: "Villa" },
  { value: "Land", label: "Land" },
  { value: "Others", label: "Others" },
];

export const countryFilterOptions = [
  { value: "India", label: "India" },
  { value: "Australia", label: "Australia" },
  { value: "UAE", label: "UAE" },
  { value: "Singapore", label: "Singapore" },
  // { value: "Others", label: "Others" },
];

export const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

export const ratingPoints = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
