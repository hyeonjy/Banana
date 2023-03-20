import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import "../../App.css";
import { useEffect, useRef, useState } from "react";

const Container = styled.div`
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
  z-index: 4;
`;

const Logo = styled(Link)`
  margin-left: 20px;
  font-size: 32px;
  color: yellow;
  font-weight: 900;
  text-decoration: none;
  font-family: yg-jalnan;
`;

const SearchBox = styled.div`
  width: 450px;
  height: 70px;
  display: flex;
  align-items: center;
`;

const Search = styled.input.attrs({ type: "text" })`
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
  height: 70px;
  display: flex;
  align-items: center;
`;

const UserIcon = styled(FontAwesomeIcon)`
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 25px;
  color: gray;
  cursor: pointer;
  ${(props) =>
    props.isUser &&
    css`
      &:hover ~ ${DropdownMenu} {
        display: block;
        &:hover {
          opacity: 1;
        }
      }
    `}
`;

const ShoppingIcon = styled(UserIcon)`
  margin-right: 20px;
`;

const UserDropdown = styled.div`
  width: 100px;
  padding-top: 105px;
  height: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DropdownMenu = styled.div`
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #9c9c9c;
  display: none;
  margin-top: -5px;
  &:hover {
    display: block;
  }
  span {
    margin: 5px 0;
    display: flex;
    justify-content: center;
    cursor: pointer;
    &:hover {
      color: #e62a2a;
    }
  }
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
        <UserDropdown>
          <UserIcon icon={faUser} isUser={true} />
          <DropdownMenu>
            <span>마이페이지</span>
            <span>글쓰기</span>
            <span>채팅하기</span>
          </DropdownMenu>
        </UserDropdown>
        <ShoppingIcon icon={faCartShopping} />
      </UserBox>
    </Container>
  );
}

export default Header;
