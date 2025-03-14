import Styled from "styled-components"

const StyleWrap = Styled.div`

.image_count{
    z-index: 9;
    position: relative;
    background: white;
    box-shadow: 0px 3px 6px #00000029;
    border: 1px solid #D6D6D6;
    border-radius: 26px;
    padding: 18px;
    color: #C6C7C7 !important;
}
.count{
    // padding: 5px;
    background: #c7c6c652;
    border-radius: 50%;
    width: 29px;
    height: 29px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
.divider{
    padding: 0 10px;
}
.filter_box{
     border: 1px solid #00000024;
    border-radius: 15px;
    // box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}
.icons{
    width: 27px;
    height: 27px;
    display: inline-flex;
}
.enquiry-card{
    margin-bottom: 50px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.details_block{
    display: flex;
}
.MuiFormHelperText-root.Mui-error {
    font-family: "Montserrat", sans-serif !important;
}
.error{
    color: #d32f2f;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1.66;
    letter-spacing: 0.03333em;
}
.enquiry_footer{
    font-size: 12px;
}
.MuiFormControlLabel-root .MuiFormControlLabel-label {
    font-family: "Montserrat", sans-serif !important;
}
@media screen and (max-width: 640px) {
    .button-block{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .details_block{
        display: block;
    }

   
}
`

export default StyleWrap
