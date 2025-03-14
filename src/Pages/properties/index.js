import FilterListIcon from "@mui/icons-material/FilterList"
import { Grid } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import Offcanvas from "react-bootstrap/Offcanvas"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { useMedia } from "react-use"
import styled from "styled-components"
import HashchingPropertyLoader from "../../Components/hashingPropertyLoader"
import { baseApiUrl } from "../../Constant"
import { setProperty, setTempProperty, setLastEvaluatedKey } from "../../Redux/globalState"
import StyleWrap from "../style"
import FilterAccordion from "./FilterAccordion"
import Property from "./property"
import { Spinner } from "react-bootstrap"
import UIButton from "../../Components/reusable/UIButton"
import NoDataFound from "../../Components/reusable/NoDataFound"

const VerticalDivider = styled.div`
  .divider {
    border-left: 1px solid #c4c1c18a;
    padding: 15px;
  }

  @media (max-width: 1200px) {
    .divider {
      border: none !important;
    }
  }
`

const Properties = () => {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [loadMore, setLoadMore] = useState(false)
  const dispatch = useDispatch()

  const isLessThan1200 = useMedia("(max-width: 1200px)")

  const property = useSelector((state) => state.globalState.property)
  const tempProperty = useSelector((state) => state.globalState.tempProperty)
  const filterArray = useSelector((state) => state.globalState.filterArray)
  const LastEvaluatedKey = useSelector((state) => state.globalState.LastEvaluatedKey)

  const fetchData = async (loadmore) => {
    loadmore ? setLoadMore(true) : setLoading(true)

    try {
      const response = await axios.post(
        `${baseApiUrl}/filterdata/filter?LastEvaluatedKey=${LastEvaluatedKey}`,
        filterArray
      )

      if (response.data.status) {
        setLoading(false)
        setLoadMore(false)
        if (LastEvaluatedKey === 0) {
          dispatch(setProperty(response.data.data))
          dispatch(setTempProperty(response.data.data))
          dispatch(setLastEvaluatedKey(response.data.LastEvaluatedKey.propertyid))
        } else {
          dispatch(setProperty([...property, ...response.data.data]))
          dispatch(setTempProperty([...tempProperty, ...response.data.data]))
          dispatch(setLastEvaluatedKey(response.data.LastEvaluatedKey.propertyid))
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const reLoadData = async () => {
    setLoading(true)

    try {
      const response = await axios.post(
        `${baseApiUrl}/filterdata/filter?LastEvaluatedKey=0`,
        filterArray
      )

      if (response.data.status) {
        dispatch(setTempProperty(response.data.data))
        dispatch(setLastEvaluatedKey(response.data.LastEvaluatedKey.propertyid))
        setLoading(false)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setLoading(false)
    }
  }

  let filterBasedOnCountry = (conditionTypeFilter) => {
    if (conditionTypeFilter === "All") {
      return property
    }
    return property.filter((item) => conditionTypeFilter === item.condition)
  }

  const filterData = async () => {
    // let ItemData = filterArray.filterarray
    // setLoading(true)

    // let conditionTypeFilter = ItemData[0]?.value
    // let countryFilter = ItemData[1]?.value
    // let propertyTypeFilter = ItemData[2]?.value
    // let filterCountryData = filterBasedOnCountry(conditionTypeFilter)

    // let filteredCountryData = filterCountryData.filter((item) => {
    //   if (countryFilter?.length > 0 && propertyTypeFilter?.length > 0) {
    //     return (
    //       countryFilter.includes(item.country) && propertyTypeFilter.includes(item.propertytype)
    //     )
    //   }

    //   if (countryFilter?.length > 0) {
    //     return countryFilter.includes(item.country)
    //   }

    //   if (propertyTypeFilter?.length > 0) {
    //     return propertyTypeFilter.includes(item.propertytype)
    //   }

    //   return filterCountryData
    // })

    // dispatch(setTempProperty(filteredCountryData))

    // if (filteredCountryData.length <= 30) {
      reLoadData()
    // }
  }

  return (
    <div>
      <StyleWrap>
        <Outlet />

        <Offcanvas show={show} onHide={() => setShow(false)}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filter</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <FilterAccordion filterData={filterData} />
          </Offcanvas.Body>
        </Offcanvas>
        <Grid container>
          {!isLessThan1200 && (
            <Grid item lg={3}>
              <section className='pe-3'>
                <div className='filter_box'>
                  <FilterAccordion filterData={filterData} />
                </div>
              </section>
            </Grid>
          )}
          <Grid item lg={9}>
            <VerticalDivider>
              <div>
                {isLessThan1200 && (
                  <div
                    className='text_primary cursor-pointer fw-bold mb-4'
                    onClick={() => setShow(true)}
                  >
                    {" "}
                    <FilterListIcon /> Show Filter
                  </div>
                )}

                {loading ? (
                  <HashchingPropertyLoader />
                ) : (
                  <>
                    {tempProperty && tempProperty.length > 0 ? (
                      <>
                        <div
                          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 
            place-content-stretch justify-items-center sm:justify-items-stretch'
                        >
                          {tempProperty?.map((property, index) => {
                            return <Property key={index} property={property} />
                          })}
                        </div>
                        {LastEvaluatedKey && !loading && (
                          <div className='center my-3'>
                            <UIButton onClick={() => fetchData(true)}>
                              {loadMore ? (
                                <Spinner
                                  className='loader'
                                  animation='border'
                                  role='status'
                                  size='sm'
                                />
                              ) : (
                                "Load More"
                              )}
                            </UIButton>
                          </div>
                        )}
                      </>
                    ) : (
                      <NoDataFound />
                    )}
                  </>
                )}
              </div>
            </VerticalDivider>
          </Grid>
        </Grid>
      </StyleWrap>
    </div>
  )
}

export default Properties
