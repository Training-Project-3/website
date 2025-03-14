import React from "react"
import Nodata from "../../../Images/no-data.jpg"

const NoDataFound = () => {
  return (
    <>
      <div className='center'>
        <img src={Nodata} alt='no-data' width={500} height={500} />
      </div>
      <div>
        <h5 className='primary_color text-center fw-bold'>No Found Data! </h5>
      </div>
    </>
  )
}

export default NoDataFound
