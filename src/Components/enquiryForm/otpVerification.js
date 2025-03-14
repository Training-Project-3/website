import React, { useState } from "react"
import styled from "styled-components"
import OTPInput from "otp-input-react"
import { primaryColor } from "../../Constant"
import UIButton from "../reusable/UIButton"
import { useEffect } from "react"

const OTPFieldWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  input {
    border: 1px solid ${primaryColor};
    border-radius: 0.25em;
    margin: 0 10px;
    color: black;
    &:focus-within,
    &:focus {
      outline: 1px solid ${primaryColor};
    }
  }
`

const resendButtonInterval = 30

const OTPVerification = ({ handleOtpVerification, phoneNumber, sendPhone }) => {
  const [otp, setOtp] = useState("")

  const [disableResendButton, setDisableResendButton] = useState({
    interval: resendButtonInterval,
    disable: true,
  })

  useEffect(() => {
    let interval
    if (disableResendButton.disable) {
      interval = setInterval(() => {
        setDisableResendButton((prevState) => {
          if (prevState.interval === 0) {
            clearInterval(interval)
            return { interval: resendButtonInterval, disable: false }
          } else {
            return { interval: prevState.interval - 1, disable: true }
          }
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [disableResendButton.disable])

  return (
    <OTPFieldWrap>
      <div className='font-bold pb-2'>Verify your Phone Number to continue</div>
      <div className='pb-3 font-medium'>Enter the 4 digit code sent to {phoneNumber}</div>

      <OTPInput
        value={otp}
        onChange={setOtp}
        placeholder='****'
        autoFocus
        OTPLength={4}
        otpType='number'
        disabled={false}
        // secure
      />

      <div className='mt-6 flex justify-center items-center gap-3'>
        <UIButton
          disabled={disableResendButton.disable}
          onClick={() => {
            sendPhone({
              phonenumber: phoneNumber,
            })
            setOtp("")
            setDisableResendButton({
              interval: resendButtonInterval,
              disable: true,
            })
          }}
        >
          <div className='font-medium'>
            Resend {disableResendButton.interval === 30 ? "" : `(${disableResendButton.interval})`}
          </div>
        </UIButton>

        <UIButton disabled={otp.length < 4} onClick={() => handleOtpVerification(otp)}>
          <div className='font-medium'>Verify</div>
        </UIButton>
      </div>
    </OTPFieldWrap>
  )
}

export default OTPVerification
