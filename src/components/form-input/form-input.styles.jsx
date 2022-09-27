import styled, { css } from 'styled-components';

const subColor = 'grey';
const mainColor = 'black';

//css block
const shrinkLabelStyles = css`
    top: -14px;
    font-size: 12px;
    color: ${mainColor};
`;

export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  ${({ shrink }) => shrink && shrinkLabelStyles};  
  /*
    從 props 中取 shrink, if shrink is true then apply the shrinkLabelStyles(css block)
    意即加入以下 css 到這裡
    top: -14px;
    font-size: 12px;
    color: ${mainColor};
  */
`;

export const Input = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;
  
  &:focus {
    outline: none;
  }

  /*當input 被focus 就去找 sibiling(FormInputLabel) 然後套用 css block 的 css*/
  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles};
  }
`;

export const Group = styled.div`
  position: relative;
  margin: 45px 0;
  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;