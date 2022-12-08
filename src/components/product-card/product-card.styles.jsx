import styled from 'styled-components';

export const ProductCartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  @media screen and (max-width: 800px) {
    /* 因為是要調整更內層的置中, 所以要用 self*/
    justify-self: center;
    align-self: center;
  }

  img {
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
  }

  button {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    /* 先隱藏 add to cart 按鈕 */
    display: none;

    /* 800px 以下會套用 */
    @media screen and (max-width: 800px) {
      /* mobile 下就取消 display: none 特效, 將其設定回 button 的預設值 block */
      display: block;
      opacity: 0.8;
      min-width: 90%;
      padding: 0 10px;
    
      img {
        width: 100%;
        height: 95%;
        object-fit: cover;
        margin-bottom: 5px;
        
      }
    }
  };

  &:hover {
    img {
      opacity: 0.8;
    }
    /* hover 時候才顯示 add to cart 按鈕 */
    button {
      opacity: 0.85;
      display: flex;
    }
  }

  /* 800px 以下會套用 */
  @media screen and (max-width: 800px) {
    width: 40vw;
    /* mobile 就把 hover 特效都取消 */
    &:hover {
      img {
        opacity: unset;
      }
      button {
        opacity: unset;
      }
    }
  }

`;

export const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const Name = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

export const Price = styled.span`
  width: 10%;
`;