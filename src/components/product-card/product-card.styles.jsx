import { styled as MUIStyled } from "@mui/material/styles";


export const ProductCartContainer = MUIStyled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  height: "350px",
  alignItems: "center",
  position: "relative",

  /* md 以下會套用 */
  [theme.breakpoints.down("md")]: {
    /* 因為是要調整更內層的置中, 所以要用 self*/
    justifySelf: "center",
    alignSelf: "center",
  },

  img: {
    width: "100%",
    height: "95%",
    objectFit: "cover",
    marginBottom: "5px"
  },

  button: {
    width: "80px",
    opacity: "0.7",
    position: "absolute",
    top: "255px",
    display: "none",

    [theme.breakpoints.down("md")]: {
      /* mobile 下就取消 display: none 特效, 將其設定回 button 的預設值 block */
      display: "block",
      opacity: "0.8",
      minWidth: "90%",
      padding: "0 10px",
    
      img: {
        width: "100%",
        height: "95%",
        objectFit: "cover",
        marginBottom: "5px",
      }
    },
    
  },

  "&:hover": {
    img: {
      opacity: "0.8",
    },
    /* hover 時候才顯示 add to cart 按鈕 */
    button: {
      opacity: "0.85",
      display: "flex"
    }
  },

  // 對每個 product做設定
  [theme.breakpoints.down("md")]: {
    width: "40vw",
    /* mobile 就把 hover 特效都取消 */
    "&:hover": {
      img : {
        opacity: "unset",
      },
      button : {
        opacity: "unset",
      }
    }
  },

}));

export const Footer = MUIStyled("div")({
  width: "100%",
  height: "5%",
  display: "flex",
  justifyContent: "space-between",
  fontSize: "18px"
});

export const Name = MUIStyled("span")({
  width: "90%",
  marginBottom: "15px"
});

export const Price = MUIStyled("span")({
  width: "10%"
});