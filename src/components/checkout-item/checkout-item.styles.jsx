import styled from 'styled-components';
import { styled as MUIStyled } from "@mui/material/styles";


export const CheckoutItemContainer = MUIStyled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  minHeight: "100px",
  borderBottom: "1px solid darkgrey",
  padding: "15px 0",
  fontSize: "20px",
  alignItems: "center",

  /* md 以下會套用 */
  [theme.breakpoints.down("md")]: {
    fontSize: "18px",
  }
}));

export const ImageContainer = MUIStyled("div")({
  width: "23%",
  paddingRight: "15px",
  img :{
    width: "100%",
    height: "100%"
  }
});

export const BaseSpan = MUIStyled("span")(({ theme }) => ({
  width: "23%",
  /* md 以下會套用 */
  [theme.breakpoints.down("md")]: {
    width: "22%",
  }
}));

export const Quantity = MUIStyled(BaseSpan)({
  display: "flex"
});

export const Arrow = MUIStyled("div")({
  cursor: "pointer"
});

export const Value = MUIStyled("span")({
  margin: "0 10px",
});

export const RemoveButton = MUIStyled("div")({
  paddingLeft: "12px",
  cursor: "pointer",
});