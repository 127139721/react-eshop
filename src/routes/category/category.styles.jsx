import { styled as MUIStyled } from "@mui/material/styles";

export const CategoryContainer = MUIStyled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridColumnGap: "20px",
  gridRowGap: "50px",

  /* md 以下會套用 */
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr 1fr",
    // gridRowGap: "5px",
    // gridColumnGap: "1px",
    justifyContent: "center",
    alignContent: "center",
    marginLeft: "12px",
  },
}));

export const Title = MUIStyled("h2")(({ theme }) => ({
  fontSize: "38px",
  marginBottom: "25px",
  textAlign: "center",

  /* md 以下會套用 */
  [theme.breakpoints.down("md")]: {
    fontSize: "28px",
  },
}));
