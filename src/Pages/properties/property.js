import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined"
import GarageIcon from "@mui/icons-material/Garage"
import SingleBedIcon from "@mui/icons-material/SingleBed"
import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import React from "react"
import { Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import areaIcon from "../../Images/area-icon.png"
import template from "../../Images/template.jpg"
import styled from "styled-components"
import ApartmentIcon from "@mui/icons-material/Apartment"
import BusinessIcon from "@mui/icons-material/Business"
import HomeIcon from "@mui/icons-material/Home"
import VillaIcon from "@mui/icons-material/Villa"
import LandscapeIcon from "@mui/icons-material/Landscape"
import OtherHousesIcon from "@mui/icons-material/OtherHouses"

const PropertyType = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #fea00170;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  font-size: 11px;
`

const Property = ({ property }) => {
  const navigate = useNavigate()

  const [hovering, setHovering] = React.useState(false)

  const handlePropertyClick = () => {
    navigate(`/property/${property?.propertyid}`)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  function formatNumberWithCommas(value) {
    if (value && value.length) {
      return " $" + parseInt(value).toLocaleString()
    } else {
      return " Not available"
    }
  }

  const propertyTypeImage = (type) => {
    switch (type) {
      case "Apartment":
        return <ApartmentIcon fontSize='small' className='property-icon' />
      case "Independent Floor":
        return <BusinessIcon fontSize='small' className='property-icon' />
      case "Independent House":
        return <HomeIcon fontSize='small' className='property-icon' />
      case "Villa":
        return <VillaIcon fontSize='small' className='property-icon' />
      case "Land":
        return <LandscapeIcon fontSize='small' className='property-icon' />
      case "Others":
        return <OtherHousesIcon fontSize='small' className='property-icon' />
      default:
        return null
    }
  }

  return (
    <Card
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className='cursor-pointer h-full w-full position-relative'
      onClick={handlePropertyClick}
    >
      <CardMedia
        component='img'
        alt={property?.propertyid}
        className={`object-cover ${
          hovering ? "scale-105 -translate-y-1" : "scale-100"
        } min-h-[176px] h-44 w-full transition-all`}
        image={property?.imageurl.length ? property?.imageurl[0] : template}
      />
      <PropertyType>{propertyTypeImage(property?.propertytype)}</PropertyType>
      <CardContent sx={{ padding: ".4rem", marginBottom: "4px" }}>
        <Typography variant='h6' component='div' className='flex justify-between items-center'>
          <div>{property?.title}</div>

          {/* <div className='text-base'>{property?.state} </div> */}
        </Typography>

        <div className='font-light text-sm pb-2'>{property?.category}</div>

        <div className='flex justify-start items-center gap-3'>
          <div className='flex'>
            <span className='pr-1'>
              <SingleBedIcon fontSize='small' />
            </span>
            <span className='font-medium text-sm'>{property?.bed}</span>
          </div>

          <div className='-translate-y-[2px] flex items-end'>
            <span className='pr-[3px]'>
              <BathtubOutlinedIcon fontSize='small' />
            </span>
            <span className='font-medium text-sm'>{property?.bath}</span>
          </div>

          <div className='flex'>
            <span className='pr-1'>
              <GarageIcon fontSize='small' />
            </span>
            <span className='font-medium text-sm'>{property?.garage}</span>
          </div>
        </div>
        <Col className='font-normal text-sm flex justify-start items-center gap-1 my-2'>
          <span className=''>
            <img src={areaIcon} alt='area-icon' className='w-4 h-4' />
          </span>
          <span>
            {property?.landsize} m<sup>2</sup>
          </span>
        </Col>

        <div className='pt-2 text-sm'>
          Estimated Weekly Rent:{" "}
          <span className='font-medium'>
            {formatNumberWithCommas(property?.estimatedweeklyrental)}
          </span>
        </div>

        <div className='pt-2 text-sm'>
          Package Price:{" "}
          <span className='font-medium'>{formatNumberWithCommas(property?.packageprice)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default Property
