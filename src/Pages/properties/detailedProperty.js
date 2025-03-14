import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import moment from "moment/moment";
import React from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import EnquiryForm from "../../Components/enquiryForm";
import HashchingPropertyLoader from "../../Components/hashingPropertyLoader";
import { primaryColor } from "../../Constant";
import bathroomIcon from "../../Images/bathroomIcon.svg";
import bedroomIcon from "../../Images/bedRoomIcon.svg";
import garageIcon from "../../Images/garage-icon.svg";
import Ratings from "../Ratings";
import StyleWrap from "../style";
import GalleryModal from "./galleryModal";

const DetailedProperty = ({
  property,
  isPropertyLoading,
  isEnquiryLoading,
  enquiryMutate,
}) => {
  const imageGalleryRef = React.useRef(null);

  const [showGallery, setShowGallery] = React.useState(false);
  const [galleryImages, setGalleryImages] = React.useState([]);

  const handleCloseGallery = () => {
    setShowGallery(false);
    imageGalleryRef.current.play();
  };

  const images = property?.imageurl?.map((image) => {
    return { original: image, thumbnail: image };
  });
  
  const handleOpenGallery = (index) => {
    imageGalleryRef.current.pause();
    setShowGallery(true);

    const images = property?.imageurl?.map((image) => {
      return { original: image, thumbnail: image };
    });

    const firstImage = images[index];

    const newImages = images.filter(
      (image) => image.original !== firstImage.original
    );

    const finalImages = [firstImage, ...newImages];

    setGalleryImages(finalImages);
  };

  function formatNumberWithCommas(value) {
    if (value && value.length) {
      return " $" + parseInt(value).toLocaleString();
    } else {
      return " Not available";
    }
  }

  return (
    <StyleWrap>
      <div className="flex flex-col lg:flex-row">
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs={12} sm={12} md={12} lg={7}>
            {isPropertyLoading ? (
              <div className="h-[370px] flex justify-center items-center">
                <HashchingPropertyLoader />
              </div>
            ) : (
              <div>
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    fontWeight: "750",
                  }}
                >
                  {property?.suburb?.suburb}
                </Typography>
                <Typography
                  gutterBottom
                  sx={{
                    color: "rgba(0, 0, 0, 0.6)",
                    fontWeight: "600",
                  }}
                >
                  {property?.state} - {property?.postcode}
                </Typography>
                <GalleryModal
                  images={galleryImages}
                  show={showGallery}
                  closeGallery={handleCloseGallery}
                />

                <ReactImageGallery
                  ref={imageGalleryRef}
                  additionalClass="detailed-property"
                  showNav={false}
                  showBullets={false}
                  showPlayButton={false}
                  items={images}
                  autoPlay={true}
                  showFullscreenButton={false}
                  onClick={(e) => {
                    const currentIndex =
                      imageGalleryRef.current.state.currentIndex;

                    handleOpenGallery(currentIndex);
                  }}
                  onScreenChange={(e) => {
                    if (e) {
                      imageGalleryRef.current.pause();
                    } else {
                      imageGalleryRef.current.play();
                    }
                  }}
                />
              </div>
            )}
            <div className="p-2">
              <div className="font-bold text-xl pb-4">Property Details:</div>

              <div className="flex flex-start gap-4 items-center justify-start mb-8">
                <span className="flex items-center gap-2 font-medium justify-center">
                  <img
                    src={bathroomIcon}
                    alt="bathroomIcon"
                    className="w-6 h-6 rounded-[50%] bg-orange-100 p-1"
                  />
                  {property?.bath}
                </span>
                <span className="flex items-center gap-2 font-medium justify-center">
                  <img
                    src={bedroomIcon}
                    alt="bathroomIcon"
                    className="w-6 h-6 rounded-[50%] bg-orange-100 p-1"
                  />
                  {property?.bed}
                </span>
                <span className="flex items-center gap-2 font-medium justify-center">
                  <img
                    src={garageIcon}
                    alt="bathroomIcon"
                    className="w-6 h-6 rounded-[50%] bg-orange-100 p-1"
                  />
                  {property?.garage}
                </span>
              </div>
              <Grid className="ps-4" container spacing={2}>
                {property?.category && (
                  <Grid sm={6}>
                    <Typography
                      className="pb-1"
                      sx={{
                        fontSize: ".9rem",
                      }}
                      gutterBottom
                    >
                      <strong className="title">Category:</strong>{" "}
                      {property?.category}
                    </Typography>
                  </Grid>
                )}

                {property?.floors && (
                  <Grid sm={6}>
                    <Typography
                      className="pb-1"
                      sx={{
                        fontSize: ".9rem",
                      }}
                      gutterBottom
                    >
                      <strong className="title">Floors:</strong>{" "}
                      {property?.floors}
                    </Typography>
                  </Grid>
                )}
                {property?.landsize && (
                  <Grid sm={6}>
                    <Typography
                      className="pb-1"
                      sx={{
                        fontSize: ".9rem",
                      }}
                      gutterBottom
                    >
                      <strong className="title">Land Size:</strong>{" "}
                      {property?.landsize} sqm
                    </Typography>
                  </Grid>
                )}
                {property?.listed && (
                  <Grid sm={6}>
                    <Typography
                      className="pb-1"
                      sx={{
                        fontSize: ".9rem",
                      }}
                      gutterBottom
                    >
                      <strong className="title">Listed Date:</strong>{" "}
                      {moment(property?.listed).format("DD/MM/YYYY")}
                    </Typography>
                  </Grid>
                )}

                {property?.explandregdate && (
                  <Grid sm={6}>
                    <Typography
                      className="pb-1"
                      sx={{
                        fontSize: ".9rem",
                      }}
                      gutterBottom
                    >
                      <strong className="title">
                        Expected Registration Date:
                      </strong>{" "}
                      {property?.explandregdate === "Registered" ||
                      property?.explandregdate === ""
                        ? property?.explandregdate
                        : moment(property?.explandregdate).format("DD/MM/YYYY")}
                    </Typography>
                  </Grid>
                )}
                {property?.estgrossyield && (
                  <Grid sm={6}>
                    <Typography
                      className="pb-1"
                      sx={{
                        fontSize: ".9rem",
                      }}
                      gutterBottom
                    >
                      <strong className="title">
                        Estimated Gross Rental Yield:
                      </strong>{" "}
                      {property?.estgrossyield}%
                    </Typography>
                  </Grid>
                )}
                {property?.estimatedweeklyrental && (
                  <Grid sm={6}>
                    <Typography
                      className="pb-1"
                      sx={{
                        fontSize: ".9rem",
                      }}
                      gutterBottom
                    >
                      <strong className="title">Estimated Weekly Rent:</strong>{" "}
                      {formatNumberWithCommas(property?.estimatedweeklyrental)}
                    </Typography>
                  </Grid>
                )}
                {property?.packageprice && (
                  <Grid sm={6}>
                    <Typography
                      className="pb-1"
                      sx={{
                        fontSize: ".9rem",
                      }}
                      gutterBottom
                    >
                      <strong className="title">Package Price:</strong>
                      {formatNumberWithCommas(property?.packageprice)}
                    </Typography>
                  </Grid>
                )}
              </Grid>

              <div className="my-2">
                <div className="text-lg font-bold mb-1">Suburb Details:</div>
                <div className="whitespace-normal">
                  {property?.suburb?.description}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-lg font-bold mb-1">Features:</div>

                <ul>
                  {property?.suburb?.features?.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={5}>
            <Card
              sx={{
                boxShadow: `0px 3px 2px ${primaryColor}`,
                borderRadius: "40px",
                marginBottom: "2rem",
                backgroundColor: "#ffa50033",
              }}
              className="mt-0 lg:mt-[56px]"
            >
              <CardContent>
                <div className="font-semibold text-xl">
                  Suburb Growth:{" "}
                  <span className="text-2xl text_primary">
                    {property?.suburb?.growth}{" "}
                  </span>
                </div>

                <Divider
                  sx={{
                    marginY: ".5rem",
                  }}
                />

                <div className="font-medium">
                  Area growth based upon the previous 12 months figures.
                </div>
              </CardContent>
            </Card>
            <div class="google-map my-4">
              <iframe
                src={property?.suburb?.location}
                width="600"
                height="450"
                title="property's location"
                allowfullscreen=""
                className="rounded-xl"
                loading="eager"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <Card className="enquiry-card my-4">
              <CardContent>
                <div className="font-bold text_primary text-lg pb-2">
                  Enquire Now
                </div>

                <EnquiryForm
                  enquiryMutate={enquiryMutate}
                  isLoading={isEnquiryLoading}
                  detailedView={true}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <Ratings allProperty={true} property={property} />
    </StyleWrap>
  );
};

export default DetailedProperty;
