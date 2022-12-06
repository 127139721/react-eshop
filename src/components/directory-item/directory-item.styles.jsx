import styled from 'styled-components';

/* 最外層 container 包住 BackgroundImage & Body components*/
export const DirectoryItemContainer = styled.div`
  /*最小寬度，至少要有 30% 的寬度存在 */
  min-width: 30%;
  /*展開高度後才有圖片 */
  height: 240px;
  /* https://www.casper.tw/css/2020/03/08/flex-size/ */
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  /* top right/left botton */
  margin: 0 7.5px 15px;
  /*避免 transform 爆出*/
  overflow: hidden;
  
  &:first-child {
    margin-right: 7.5px;
  }
  &:last-child {
    margin-left: 7.5px;
  }

  /* 800px 以下會套用 */
  @media screen and (max-width: 800px) {
    /* 控制圖片高度 */
    height: 200px;
  }

  &:hover {
    cursor: pointer;
    /* ${BackgroundImage} 這種寫法可以選取到 DirectoryItemContainer component 內包含之 BackgroundImage */
    ${BackgroundImage} {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }
    ${Body} {
      opacity: 0.9;
    }
  }
`;

export const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};  /* ({ imageUrl }) 從props中取出imageUrl */
`;

export const Body = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute;
  h2 {
    font-weight: bold;
    margin: 0 6px 0;
    font-size: 22px;
    color: #4a4a4a;
    text-transform: uppercase;
  }
  p {
    font-weight: lighter;
    font-size: 16px;
  }
`;
