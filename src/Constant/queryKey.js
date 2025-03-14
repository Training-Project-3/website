export const queryKey = {
  getProperties: {
    key: "get-properties",
    url: "/hashchingprops/home-page/load-all?LastEvaluatedKey=0",
  },
  getPropertyById: (id) => ({
    key: `get-property-${id}`,
    url: `/hashchingprops/single-data/${id}`,
  }),
  postEnquiry: {
    key: "post-enquiry",
    url: "/propertyenquiry/submit-enquiry",
  },
  postSendOTP: {
    key: "post-verify-otp",
    url: "/propertyenquiry/send-otp",
  },
  getLocations: {
    key: "get-locations",
    url: "/hashchingprops/suburbs",
  },
};
