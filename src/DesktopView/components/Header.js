import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  margin-left: 20px;
  font-size: 32px;
  color: yellow;
  font-weight: 900;
  text-decoration: none;
`;

const SearchBox = styled.div`
  width: 450px;
  height: 70px;
  display: flex;
  align-items: center;
`;

const Search = styled.input`
  width: 400px;
  height: 30px;
  border-radius: 8px;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  margin-left: 12px;
  cursor: pointer;
`;

const UserBox = styled.div`
  width: 120px;
  height: 70px;
  display: flex;
  align-items: center;
`;

const UserBoxIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
  color: gray;
  margin: 14px;
  cursor: pointer;
`;

function Header() {
  return (
    <Container>
      <Logo to="/">BANANA</Logo>
      <SearchBox>
        <Search />
        <SearchIcon icon={faMagnifyingGlass} />
      </SearchBox>
      <UserBox>
        <UserBoxIcon icon={faUser} />
        <UserBoxIcon icon={faCartShopping} />
      </UserBox>
    </Container>
  );
}

export default Header;
