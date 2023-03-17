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

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;
  img {
    width: 100%;
    height: 100%;
  }

`;

export const BaseSpan = styled.span`
  width: 23%;
  @media screen and (max-width: 800px) {
    width: 22%;
  }
`;

export const Quantity = styled(BaseSpan)`
  display: flex;
`;

export const Arrow = styled.div`
  cursor: pointer;
`;

export const Value = styled.span`
  margin: 0 10px;
`;

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;