import { styled as MUIStyled } from "@mui/material/styles";

/*注意 DirectoryContainer styled component name 需大寫開頭*/
export const DirectoryContainer = MUIStyled("div")({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between"
});