import React from "react"
import UILoader from "../reusable/UILoader"

const HashchingPropertyLoader = ({ fullPage = false }) => {
  return (
    <div className={`flex justify-center items-center w-full ${fullPage ? "h-screen" : "h-auto"}`}>
      <div className=' cursor-pointer w-auto text-center'>
        <div className='text-center mt-5'>
          <UILoader />
        </div>
      </div>
    </div>
  )
}

export default HashchingPropertyLoader
