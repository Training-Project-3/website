import { Box, CircularProgress, Modal, Rating, TextField, Typography } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import styled from "styled-components"
import UIButton from "../../Components/reusable/UIButton"
import { baseApiUrl, ratingCounts, ratingPoints } from "../../Constant"
import {
  label_77,
  label_78,
  label_79,
  label_80,
  label_81,
  label_82,
  val_msg_22,
  val_msg_23,
  val_msg_24,
  val_msg_26
} from "../../Constant/label"

const RatingBar = styled.div`
  width: 200px;
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
`

const HighlightedArea = styled.div`
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background-color: orange;
`

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4
}

const Ratings = ({ property, allProperty }) => {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleClose = () => {
    setOpen(false)
    initialState()
  }

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [review, setReview] = useState("")
  const [errors, setErrors] = useState({})

  const [propertyReviews, setpropertyReviews] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()
    const errors = {}
    if (!name.trim()) {
      errors.name = val_msg_26
    }
    if (!email.trim()) {
      errors.email = val_msg_22
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = val_msg_23
    }
    if (!review.trim()) {
      errors.review = val_msg_24
    }
    if (Object.keys(errors).length === 0) {
      postReviewData()
    } else {
      setErrors(errors)
    }
  }

  const initialState = () => {
    setEmail("")
    setReview("")
    setName("")
    setErrors({})
  }

  const postReviewData = async () => {
    setLoading(true)
    let obj = {
      emailId: email,
      reviews: review,
      personname: name,
      rating: rating,
      createdOn: new Date()
    }
    try {
      const response = await axios.post(
        `${baseApiUrl}/hashchingprops/review/${property.propertyid}`,
        obj
      )
      if (response.data.status) {
        setLoading(false)
        setOpen(false)
        initialState()
        getReviewData()
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setLoading(false)
    }
  }

  const getReviewData = async () => {
    try {
      const response = await axios.get(`${baseApiUrl}/hashchingprops/review/${property.propertyid}`)
      if (response.data.status) {
        setpropertyReviews(response.data.reviews)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    getReviewData()
  }, [property])

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${ratingPoints[value]}`
  }

  for (const key in propertyReviews) {
    const rating = Math.round(propertyReviews[key].rating)
    ratingCounts[rating]++
  }

  const totalReviews = Object.values(ratingCounts).reduce((acc, curr) => acc + curr, 0)

  const types = []
  for (const key in ratingCounts) {
    const percentage = ((ratingCounts[key] / totalReviews) * 100).toFixed(2)
    types.push({
      label:
        key > 3
          ? "Excellent"
          : key > 2
          ? "Good"
          : key > 1
          ? "Average"
          : key > 0
          ? "Poor"
          : "Very Poor",
      ratingPercentage: percentage === "NaN" ? 0 : percentage,
      count: ratingCounts[key].toString()
    })
  }

  const overallRating =
    Object.entries(ratingCounts).reduce((acc, [key, value]) => acc + parseInt(key) * value, 0) /
    totalReviews

  const productRating = {
    overallRating: overallRating.toFixed(1),
    types: types
  }

  return (
    <>
      <div>
        <h5 className='fw-bold'> {label_77} </h5>
        <Row className='my-3'>
          <Col xl={5}>
            <h6 className='my-3'> {label_78} </h6>
            {productRating?.types.map((data) => (
              <Row>
                <Col xs={5}>
                  <p className='rating_label'>{data.label}</p>
                </Col>
                <Col xs={7} className='mt-1'>
                  <RatingBar>
                    <HighlightedArea percentage={data.ratingPercentage} />
                  </RatingBar>
                </Col>
              </Row>
            ))}
          </Col>
          <Col xl={3} md={6} className='px-5'>
            <h6 className='my-3'> {label_79} </h6>
            <div className='d-flex'>
              <h1>{productRating.overallRating !== "NaN" ? productRating.overallRating : "0"}</h1>
              <div className='px-2'>
                <Rating
                  name='read-only'
                  value={productRating.overallRating !== "NaN" ? productRating.overallRating : "0"}
                  getLabelText={getLabelText}
                  precision={0.1}
                  readOnly
                />
                <p className='text-center'>
                  {propertyReviews && Object.values(propertyReviews).length} {label_77}
                </p>
              </div>
            </div>
          </Col>
          {allProperty && (
            <Col xl={4} md={6}>
              <h6 className='my-3'> {label_80} </h6>
              <div className=''>
                <Rating
                  name='half-rating'
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setRating(newValue)
                    setOpen(true)
                  }}
                  value={rating}
                  size='large'
                />
              </div>
              <p>{label_81}</p>
            </Col>
          )}
        </Row>

        <Row>
          {propertyReviews &&
            Object.values(propertyReviews)
              .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
              .map((data, index) => (
                <Col className='my-4' key={index} md={12}>
                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Rating
                      name='read-only'
                      value={data.rating}
                      getLabelText={getLabelText}
                      readOnly
                      precision={0.5}
                    />
                  </Box>
                  <Box className='fw-bold primary_color '>
                    <i>{ratingPoints[data.rating]}</i>
                  </Box>
                  <p className='fw-medium review_time'>
                    By {data.personname} on {new Date(data.createdOn).toLocaleString()}{" "}
                  </p>
                  <i>{data.reviews}</i>
                </Col>
              ))}
        </Row>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        disableBackdropClick={loading}
      >
        <Box sx={style}>
          {loading ? (
            <>
              <div className='center'>
                <CircularProgress
                  sx={{
                    marginRight: "10px !important",
                    width: "40px !important",
                    height: "40px !important",
                    color: "orange"
                  }}
                />
              </div>
              <p className='text-center'>Please wait...</p>
            </>
          ) : (
            <>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                {label_82}
              </Typography>
              <Rating
                name='half-rating'
                size='large'
                precision={0.5}
                onChange={(event, newValue) => {
                  if (newValue >= 0.5) {
                    setRating(newValue)
                  } else {
                    setRating(0.5)
                  }
                }}
                value={rating}
              />
              <form onSubmit={handleSubmit}>
                <TextField
                  className='my-2'
                  fullWidth
                  id='outlined-basic'
                  label='Name'
                  variant='outlined'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField
                  className='my-2'
                  fullWidth
                  id='outlined-basic'
                  label='Email ID'
                  variant='outlined'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  className='my-2'
                  fullWidth
                  id='outlined-basic'
                  label='Review'
                  variant='outlined'
                  multiline
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  error={!!errors.review}
                  helperText={errors.review}
                />
                <UIButton disable={loading} type='submit'>
                  Submit
                </UIButton>
              </form>
            </>
          )}
        </Box>
      </Modal>
    </>
  )
}

export default Ratings
