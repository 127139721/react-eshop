import styled from 'styled-components';
import { styled as MUIStyled } from "@mui/material/styles";


export const CheckoutPageContainer = MUIStyled("div")(({ theme }) => ({
  width: "55%",
  minHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "50px auto 0",
  padding: "20px",
  button: {
    marginLeft: "auto",
    marginTop: "50px",
  },

  /* md 以下會套用 */
  [theme.breakpoints.down("md")]: {
    width: "90%",
  },

}));

//for checkout page header titles
export const CheckoutHeaderContainer = MUIStyled("div")({
  width: "100%",
  height: "40px",
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid darkgrey",
});

export const HeaderBlockContainer = MUIStyled("div")(({ theme }) => ({
  textTransform: "capitalize",
  width: "23%",
  /* 控制 Remove title width*/
  "&:last-child": {
    width: "8%",
  },

  /* md 以下會套用 */
  [theme.breakpoints.down("md")]: {
    width: "22%",
    "&:last-child": {
      width: "12%",
    }
  }
}));

export const TotalContainer =  MUIStyled("div")({
  marginTop: "30px",
  marginLeft: "auto",
  fontSize: "36px",
});


// export const WarningContainer = styled.div`
//   text-align: center;
//   margin-top: 40px;
//   font-size: 24px;
//   color: red;
// `;