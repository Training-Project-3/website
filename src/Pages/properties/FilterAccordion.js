import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { Radio } from "@mui/material"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Checkbox from "@mui/material/Checkbox"
import Divider from "@mui/material/Divider"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  conditionOptions,
  countryFilterOptions,
  primaryColor,
  propertyTypeFilterOptions
} from "../../Constant"
import { label_1, label_2, label_3, label_4, leaseOption } from "../../Constant/label"
import { setFilterArray, setFiltered } from "../../Redux/globalState"

const MUIAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: "none",
  "&.MuiAccordion-root": {
    "&::before": {
      height: 0
    }
  }
}))

const blueColorText = "primaryColor"

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5"
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: theme.palette.mode === "dark" ? "rgba(57,75,89,.5)" : "rgba(206,217,224,.5)"
  }
}))

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: `${primaryColor}`,
  backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&::before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""'
  },
  "input:hover ~ &": {
    backgroundColor: `${primaryColor}`
  }
})

function BpCheckbox(props) {
  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "transparent" }
      }}
      disableRipple
      color='default'
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  )
}
export default function FilterAccordion({ filterData }) {
  const [condition, setCondition] = useState("All")
  const [type, setType] = useState("")

  const dispatch = useDispatch()

  const filtered = useSelector((state) => state.globalState.filtered)
  const filterArray = useSelector((state) => state.globalState.filterArray)

  useEffect(() => {
    if (filtered) {
      filterData()
    }
  }, [filterArray, filtered])

  const handleCheckcondition = (newValueArray) => {
    setCondition(newValueArray)
    const updatedFilterArray = filterArray.filterarray.map((item) => {
      if (item.label === "condition") {
        return { ...item, status: true, value: newValueArray }
      } else {
        return { ...item }
      }
    })
    dispatch(setFiltered(true))
    dispatch(setFilterArray({ filterarray: updatedFilterArray }))
    // }
  }

  const handleCheckboxChange = (newValue) => {
    const countryLabelIndex = filterArray.filterarray.findIndex((item) => item.label === "country")
    const countryValueArray = filterArray.filterarray[countryLabelIndex].value

    const valueExists = countryValueArray.includes(newValue)

    let updatedCountryValue
    if (valueExists) {
      updatedCountryValue = countryValueArray.filter((value) => value !== newValue)
    } else {
      updatedCountryValue = [...countryValueArray, newValue]
    }

    const updatedFilterArray = filterArray.filterarray.map((item) => {
      if (item.label === "country") {
        return { ...item, status: true, value: updatedCountryValue }
      } else {
        return { ...item }
      }
    })

    dispatch(setFiltered(true))
    dispatch(setFilterArray({ filterarray: updatedFilterArray }))
  }

  const handleSizeCheckboxChange = (newValue) => {
    const propertyTypeLabelIndex = filterArray.filterarray.findIndex(
      (item) => item.label === "propertytype"
    )
    const propertyTypeValueArray = filterArray.filterarray[propertyTypeLabelIndex].value

    const valueExists = propertyTypeValueArray.includes(newValue)

    let updatedPropertyTypeValue
    if (valueExists) {
      updatedPropertyTypeValue = propertyTypeValueArray.filter((value) => value !== newValue)
    } else {
      updatedPropertyTypeValue = [...propertyTypeValueArray, newValue]
    }

    const updatedFilterArray = filterArray.filterarray.map((item) => {
      if (item.label === "propertytype") {
        return { ...item, status: true, value: updatedPropertyTypeValue }
      } else {
        return { ...item }
      }
    })

    dispatch(setFiltered(true))
    dispatch(setFilterArray({ filterarray: updatedFilterArray }))
  }

  const handleCheckType = (newValueArray) => {
    setType(newValueArray);
    const updatedFilterArray = filterArray.filterarray.map((item) => {
      if (item.label === "contractType") {
        return { ...item, status: true, value: newValueArray };
      } else {
        return { ...item };
      }
    });
    dispatch(setFiltered(true));
    dispatch(setFilterArray({ filterarray: updatedFilterArray }));
  };
  

  const [isAccordionOpen, setIsAccordionOpen] = useState(true)
  const [isConditionAccordionOpen, setIsConditionAccordionOpen] = useState(true)
  const [isPriceAccordionOpen, setIsPriceAccordionOpen] = useState(true)
  const [isPropertyTypeAccordionOpen, setIsPropertyTypeAccordionOpen] = useState(true)

  const handleAccordionToggle = () => {
    setIsAccordionOpen((prev) => !prev)
  }
  const handleConditionAccordionToggle = () => {
    setIsConditionAccordionOpen((prev) => !prev)
  }
  const handlePriceAccordionToggle = () => {
    setIsPriceAccordionOpen((prev) => !prev)
  }
  const handlePropertyTypeAccordionToggle = () => {
    setIsPropertyTypeAccordionOpen((prev) => !prev)
  }

  return (
    <>
      <MUIAccordion expanded={isAccordionOpen} onChange={handleAccordionToggle}>
        <AccordionSummary
          expandIcon={isAccordionOpen ? <RemoveIcon /> : <AddIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
          sx={{ border: "none" }}
        >
          <Typography color={blueColorText}> {label_1} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {conditionOptions?.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Radio
                    size='small'
                    checked={condition === option.value}
                    onChange={() => {
                      handleCheckcondition(option.value)
                    }}
                    style={{ color: "#5F732C" }} // Apply custom color
                    value={option.value}
                    name='condition-radio'
                  />
                }
                label={
                  <span
                    className='radio_label'
                    dangerouslySetInnerHTML={{ __html: option.label }}
                  />
                }
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </MUIAccordion>
      <Divider />

      <MUIAccordion expanded={isPropertyTypeAccordionOpen} onChange={handlePropertyTypeAccordionToggle}>
        <AccordionSummary
          expandIcon={isPropertyTypeAccordionOpen ? <RemoveIcon /> : <AddIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{ border: "none" }}
        >
          <Typography color={blueColorText}> {label_4} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {leaseOption?.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Radio
                    size="small"
                    checked={type === option.value}
                    onChange={() => {
                      handleCheckType(option.value);
                    }}
                    style={{ color: "#5F732C" }} // Apply custom color
                    value={option.value}
                    name="condition-radio"
                  />
                }
                label={
                  <span
                    className="radio_label"
                    dangerouslySetInnerHTML={{ __html: option.label }}
                  />
                }
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </MUIAccordion>
      <Divider />

      <MUIAccordion expanded={isConditionAccordionOpen} onChange={handleConditionAccordionToggle}>
        <AccordionSummary
          expandIcon={isConditionAccordionOpen ? <RemoveIcon /> : <AddIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
          sx={{ border: "none" }}
        >
          <Typography color={blueColorText}> {label_2} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {countryFilterOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <BpCheckbox
                    checked={filterArray.filterarray
                      .find((item) => item.label === "country")
                      .value.includes(option.value)}
                    onChange={() => {
                      handleCheckboxChange(option.value)
                    }}
                  />
                }
                label={<span dangerouslySetInnerHTML={{ __html: option.label }} />}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </MUIAccordion>

      <Divider />

      <MUIAccordion expanded={isPriceAccordionOpen} onChange={handlePriceAccordionToggle}>
        <AccordionSummary
          expandIcon={isPriceAccordionOpen ? <RemoveIcon /> : <AddIcon />}
          aria-controls='panel3-content'
          id='panel3-header'
        >
          <Typography color={blueColorText}> {label_3} </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <FormGroup>
              {propertyTypeFilterOptions?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <BpCheckbox
                      checked={filterArray.filterarray
                        .find((item) => item.label === "propertytype")
                        .value.includes(option.value)}
                      onChange={() => {
                        handleSizeCheckboxChange(option.value, option.query)
                      }}
                    />
                  }
                  label={<span dangerouslySetInnerHTML={{ __html: option.label }} />}
                />
              ))}
            </FormGroup>
          </Typography>
        </AccordionDetails>
      </MUIAccordion>
    </>
  )
}
