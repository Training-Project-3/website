import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material"
import UIButton from "../reusable/UIButton"
import { emailRegex } from "../../Constant"
import { useParams } from "react-router-dom"
import StyleWrap from "../../Pages/style"
import { useSelector } from "react-redux"
import { Modal } from "react-bootstrap"

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(4, "Minimum 4 characters")
    .max(50, "Name is too long")
    .matches(/^[A-Za-z0-9\s]+$/, "Only numbers and letters are allowed"),
  emailId: yup
    .string()
    .email("Please enter a valid email address")
    .matches(emailRegex, "Please enter a valid email address")
    .required("Email is required")
    .max(50, "Email is too long"),
  phoneNo: yup.string().required("Phone Number is required"),
  financepreapproved: yup.string().required("Please provide an answer to this question"),
  enquiry: yup.string().required("Enquiry is required")
})

const EnquiryForm = ({ enquiryMutate, isLoading, detailedView = false }) => {
  const { id: propertyid } = useParams()

  const showEnquiryModal = useSelector((state) => state.globalState.showEnquiryModal)

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = (event) => {
    event.preventDefault()
    setShow(true)
  }

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      emailId: "",
      phoneNo: "",
      enquiry: "",
      financepreapproved: ""
    }
  })

  const handleOtpVerification = () => {
    let propertyId = showEnquiryModal && propertyid ? null : propertyid ?? null

    const data = getValues()

    let enquiryData = {
      name: data.name,
      emailid: data.emailId,
      phonenumber: data.phoneNo,
      enquiry: data.enquiry,
      financepreapproved: data.financepreapproved,
      propertyid: propertyId
    }

    enquiryMutate(enquiryData)
  }

  const submit = async (data) => {
    handleOtpVerification(data)
  }

  const Onlytext = (e) => {
    const re = /^[A-Za-z]+$/
    if (e.key === " " || re.test(e.key)) {
      return true
    } else {
      e.preventDefault()
    }
  }

  const handleKeyDown = (event) => {
    const isNumericKey =
      (event.key >= "0" && event.key <= "9") ||
      ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
    if (!isNumericKey) {
      event.preventDefault()
    }
  }
  return (
    <StyleWrap>
      <div className='mt-5'>
        Interested in one of our properties, or want to know more? Leave your details below and
        we’ll be in touch
      </div>

      <form
        // onSubmit={handleSubmit((data) => {
        //   submit(data)
        // })}
        onSubmit={handleShow}
      >
        <div className='flex flex-col gap-[14px] min-w-[230px] mt-5 pt-2'>
          <div
            className={`${
              detailedView
                ? "flex flex-col gap-[14px] sm:flex-row flex-wrap"
                : "flex flex-col gap-[14px]"
            }`}
          >
            <FormGroup className='flex-grow'>
              <TextField
                error={errors?.name}
                {...register("name")}
                id='name'
                label='Name'
                variant='outlined'
                helperText={errors?.name?.message}
                onKeyDown={Onlytext}
                inputProps={{ maxLength: 50 }}
              />
            </FormGroup>
            <FormGroup className='flex-grow'>
              <TextField
                error={errors?.emailId}
                {...register("emailId")}
                id='emailId'
                label='Email'
                variant='outlined'
                helperText={errors?.emailId?.message}
                inputProps={{ maxLength: 50 }}
              />
            </FormGroup>
            <FormGroup className='flex-grow'>
              <TextField
                error={errors?.phoneNo}
                {...register("phoneNo")}
                id='phoneNo'
                label='Phone No'
                placeholder='0434343434'
                variant='outlined'
                type='text'
                helperText={errors?.phoneNo?.message}
                onKeyDown={(e) => {
                  handleKeyDown(e)
                }}
                inputProps={{ maxLength: 10 }}
              />
            </FormGroup>
          </div>
          <FormGroup>
            <TextField
              error={errors?.enquiry}
              {...register("enquiry")}
              id='enquiry'
              label='Enquiry'
              variant='outlined'
              multiline
              rows={2}
              helperText={errors?.enquiry?.message}
              inputProps={{ maxLength: 200 }}
            />
          </FormGroup>

          <FormControl>
            <div>Do you have an existing pre-approval?</div>

            <Controller
              rules={{ required: true }}
              control={control}
              name='financepreapproved'
              helperText={errors?.financepreapproved?.message}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  sx={{
                    flexDirection: "row"
                  }}
                >
                  <FormControlLabel value='yes' control={<Radio color='warning' />} label='Yes' />
                  <FormControlLabel value='no' control={<Radio color='warning' />} label='No' />
                  <FormControlLabel
                    value='rns'
                    control={<Radio color='warning' />}
                    id='radio'
                    label='Rather not say'
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
          {errors?.financepreapproved?.message && (
            <p className='error'>{errors?.financepreapproved?.message}</p>
          )}

          <div className='button-block'>
            <UIButton type='submit'>
              {isLoading ? (
                <>
                  <CircularProgress
                    sx={{
                      marginRight: "10px !important",
                      width: "20px !important",
                      height: "20px !important",
                      color: "white"
                    }}
                  />
                  Loading...
                </>
              ) : (
                "Submit"
              )}
            </UIButton>
          </div>
          <p className='enquiry_footer'>
            We will never share or sell your details. For more information on how we handle your
            data, see our{" "}
            <a
              className='text_primary'
              href='https://www.hashching.com.au/privacy'
              target='_blank'
              rel='noreferrer'
            >
              privacy policy
            </a>{" "}
            and{" "}
            <a
              className='text_primary'
              href='https://www.hashching.com.au/terms-conditions'
              target='_blank'
              rel='noreferrer'
            >
              terms of use
            </a>
            .
          </p>
        </div>
      </form>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body closeButton>
          {" "}
          <div className='center'>
            <h5>Please login to add enquiry</h5>
          </div>{" "}
          <div className='center my-3'>
            <UIButton
              onClick={() =>
                (window.location.href = "https://realestateapp.newebon.com/login")

                

              }
            >
              Login
            </UIButton>
          </div>
          <div className='center my-2'>
            <p>
              Not an user?{" "}
              <span
                onClick={() =>
                  (window.location.href =
                    "https://realestateapp.newebon.com/register")
                }
                className='text_primary text-decoration-underline cursor-pointer'
              >
                Register
              </span>
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </StyleWrap>
  )
}

export default EnquiryForm
