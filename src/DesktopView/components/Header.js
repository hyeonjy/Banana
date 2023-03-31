import styled, { css, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import "../../App.css";

export const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 25;
`;

const Logo = styled(Link)`
  margin: 0 20px;
  font-size: 32px;
  color: yellow;
  font-weight: 900;
  font-family: yg-jalnan;
`;

const SearchBox = styled.div`
  max-width: 450px;
  width: 50%;
  height: 70px;
  display: flex;
  align-items: center;
`;

const Search = styled.input.attrs({ type: "text" })`
  width: 88%;
  padding-left: 10px;
  height: 35px;
  border-radius: 8px;
  border: 0px solid gray;
  background-color: #edededb3;
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
  margin-left: 10px;
  color: #83817c;
  cursor: pointer;
`;
const menuFadeAnimation = keyframes`
  0%{
    opacity: 0;
    transform: translateY(-15px);
  }
  100%{
    opacity: 1;
    transform: translateY(0px);
  }
`;

const UserIcon = styled(FontAwesomeIcon)`
  padding: 10px 0;
  font-size: 25px;
  color: gray;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  width: 80px;
  display: none;
  flex-direction: column;
  position: absolute;
  top: 100%;

  padding: 10px 8px;
  background-color: white;
  border-radius: 20px;
  border: 1px solid rgb(156 156 156 / 42%);
  box-shadow: rgb(180 180 180 / 56%) 0px 4px 4px 0px;

  span {
    margin: 5px 0;
    text-align: center;
    display: block;
    line-height: 20px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      font-weight: 700;
    }
  }
`;
const UserDropdown = styled.div`
  padding-top: 0px;
  height: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  ${(props) =>
    props.isuser &&
    css`
      &:hover ${DropdownMenu} {
        display: flex;
        animation: ${menuFadeAnimation} 0.5s linear 1;
        &:hover {
          opacity: 1;
        }
      }
    `}
`;

const ShoppingIcon = styled(UserIcon)``;
const ShopIconLink = styled(Link)`
  text-align: center;
`;
const UserBox = styled.div`
  margin: 0 15px;
  height: 70px;
  display: flex;
  align-items: center;
  width: 90px;
  ${UserDropdown}, ${ShopIconLink} {
    flex-grow: 1;
  }
`;

function Header() {
  //if (window.location.pathname.slice(0, 4) === "/img") return null;
  return (
    <Container>
      <Logo to="/">BANANA</Logo>
      <SearchBox>
        <Search placeholder="어떤 물건을 찾으시나요?" />
        <SearchIcon icon={faMagnifyingGlass} />
      </SearchBox>
      <UserBox>
        <UserDropdown isuser="true">
          <UserIcon icon={faUser} />
          <DropdownMenu>
            <Link to="/mypage/share">
              <span>마이페이지</span>
            </Link>

            <Link to="/upload">
              <span>글쓰기</span>
            </Link>
            <span>채팅하기</span>
          </DropdownMenu>
        </UserDropdown>
        <ShopIconLink to="/mypage/heart">
          <ShoppingIcon icon={faCartShopping} />
        </ShopIconLink>
      </UserBox>
    </Container>
  );
}

export default Header;
