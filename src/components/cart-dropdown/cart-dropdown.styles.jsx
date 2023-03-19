import styled from 'styled-components';
import { styled as MUIStyled } from "@mui/material/styles";


export const CartDropdownContainer = MUIStyled("div")(({ theme }) => ({
  position: "absolute",
  width: "240px",
  height: "340px",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  border: "1px solid black",
  backgroundColor: "grey",
  top: "90px",
  right: "40px",
  zIndex: "5",
}));

export const EmptyMessage = MUIStyled("span")({
  fontSize: "18px",
  margin: "50px auto",
});

export const CartItems = MUIStyled("div")({
  height: "240px",
  display: "flex",
  flexDirection: "column",
  overflow: "scroll"
});