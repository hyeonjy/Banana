import styled from "styled-components";

const Header = styled.header`
  display: flex;
`;
const Logo = styled.h1`
  font-size: 18px;
  color: yellow;
  font-weight: 900;
`;

function Mhome() {
  return (
    <Header>
      <Logo>BANANA</Logo>
    </Header>
  );
}
export default Mhome;
