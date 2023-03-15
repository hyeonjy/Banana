import styled from "styled-components";

const Logo = styled.h1`
  font-size: 35px;
  color: yellow;
  font-weight: 900;
`;

function Header() {
  return (
    <>
      <Logo>Banana</Logo>
    </>
  );
}

export default Header;
