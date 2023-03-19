import { styled as MUIStyled } from "@mui/material/styles";


export const DirectoryItemContainer = MUIStyled("div")(({ theme }) => ({
  /*最小寬度，至少要有 30% 的寬度存在 */
  minWidth: "30%",
  /*展開高度後才有圖片 */
  height: "240px",
  /* https://www.casper.tw/css/2020/03/08/flex-size/ */
  flex: "1 1 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid black",
  /* top right/left botton */
  margin: "0 7.5px 15px",
  /*避免 transform 爆出*/
  overflow: "hidden",
  
  // 第一列圖
  "&:first-child": {
    marginRight: "7.5px",
  },

  // 第二列圖
  "&:last-child": {
    marginLeft: "7.5px",
  },

  /* md 以下會套用 */
  [theme.breakpoints.down("md")]: {
    height: "200px",
    marginTop: "10px"
  }
}));

export const BackgroundImage = MUIStyled("div")(({imageUrl}) => (
  {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "cover",
    backgroundImage: `url(${imageUrl})`, /* ({ imageUrl }) 從props中取出imageUrl */
    "&:hover": {
      transform: "scale(1.1)",
      transition: "transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95)",
    }
  }
));

export const Body = MUIStyled("div")({
  height: "90px",
  padding: "0 25px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid black",
  backgroundColor: "white",
  opacity: "0.7",
  position: "absolute",

  h2: {
    fontWeight: "bold",
    margin: "0 6px 0",
    fontSize: "22px",
    color: "#4a4a4a",
    textTransform: "uppercase",
  }, 

  p: {
    fontWeight: "lighter",
    fontSize: "16px",
  }

});
