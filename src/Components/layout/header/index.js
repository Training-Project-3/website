import { AppBar, Container } from "@mui/material";
import logoIcon from "../../../Images/logo.svg";
import React from "react";
import UIButton from "../../reusable/UIButton";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Styled from "styled-components";

const DasboardWrap = Styled.div`

@media screen and (min-width: 1200px) {
  padding: 0 10%;
}
`;

const ImageWrap = Styled.div`
      .logo_image{
        width:auto;
        height:40px;
      }
      @media(max-width: 1023px) {
        .logo_image{
          width:auto;
          height:30px;
        }
    }
  `;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const handleEnquiryOpen = () => {
    dispatch({ type: "globalState/setShowEnquiryModal", payload: true });
  };

  const handleLogoClick = () => {
    if (pathname === "/") {
      window.location.reload();
    }
    navigate("/");
  };

  return (
    <AppBar
      sx={{
        paddingY: "4px",
        paddingX: "0px",
        background: "white",
        position: "sticky",
        top: "0",
      }}
      id="property-header"
    >
      <DasboardWrap>
        <div className="flex justify-between items-center px-4 py-3">
          <div
            className="relative cursor-pointer pr-1"
            onClick={handleLogoClick}
          >
            <ImageWrap>
              {/* <a href="https://www.newebon.com/"> */}
              <a href="https://home.newebon.com/">

                <img
                  className="logo_image"
                  src={logoIcon}
                  alt="RealEstateLogo"
                />
              </a>
            </ImageWrap>

            {/* <img
              alt="logo"
              src={logoIcon}
              className="object-cover min-h-[20px] max-h-[40px]"
            /> */}
            {/* <div className="font-semibold text-base absolute text_primary bottom-0 right-0 translate-y-3 -translate-x-4">
              props
            </div> */}
          </div>
          <div className="pl-1 flex flex-wrap items-center justify-end gap-1 md:gap-3 translate-y-1">
            <div className="flex justify-end">
              {" "}
              <Button
                sx={{
                  textTransform: "none",
                  ...(window.innerWidth < 450 && { fontSize: "10px" }),
                  color: "#0F0074",
                }}
                onClick={() =>
                  (window.location.href =
                    "https://realestateapp.newebon.com/login")
                }
                variant="text"
              >
                Login
              </Button>
              <span className="mx-1" />
              <UIButton
                onClick={() =>
                  (window.location.href =
                    "https://realestateapp.newebon.com/register")
                }
              >
                Register
              </UIButton>
            </div>
          </div>
        </div>
      </DasboardWrap>
    </AppBar>
  );
};

export default Header;
