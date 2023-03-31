import { useEffect, useState } from "react";
import styled from "styled-components";
import { itemsGroup } from "../ItemGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SideNavContainer = styled.div`
  width: 160px;
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin-top: 66px;
`;

//메인메뉴
const MainManu = styled.div`
  height: 60px;
  font-weight: 600;
  font-size: 17px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0% 8%;
  width: 84%;
  border-radius: 15px;
  &:first-of-type {
    margin-top: 10px;
  }
  &:hover {
    background-color: whitesmoke;
  }
`;
const DownIcon = styled(FontAwesomeIcon)``;

//서브메뉴 - 아코디언
const SubUl = styled.ul`
  margin-left: 20px;

  overflow: hidden;
  max-height: ${({ open }) => (open ? "500px" : "0")};
  transition: ${({ open }) => (open ? "max-height 0.6s ease-in-out" : "none")};
`;
const SubLi = styled(Link)`
  line-height: 35px;
  display: block;
  &:hover {
    color: orange;
    font-weight: 600;
  }
  cursor: pointer;
`;

function SideNav() {
  //---아코디언 메뉴---//
  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <SideNavContainer>
      <h1
        style={{
          lineHeight: "80px",
          fontWeight: "700",
          fontSize: "22px",
          borderBottom: "2px solid #5d5d5dba",
          //borderTop: "3px solid gray",
          boxSizing: "border-box",
        }}
      >
        카테고리
      </h1>
      {itemsGroup.map((menu, index) => (
        <div key={index}>
          <MainManu onClick={() => handleClick(index)}>
            <span>{menu.main}</span>
            <DownIcon icon={faCaretDown} />
          </MainManu>
          <SubUl open={activeIndex === index ? 1 : 0}>
            <SubLi to={{ pathname: "/group", search: `?category=${index}` }}>
              전체
            </SubLi>
            {menu.sub.map((sub, index) => (
              <SubLi
                key={index}
                to={{
                  pathname: `/group/${activeIndex}`,
                  search: `?subitem=${sub}`,
                }}
                onClick={() => setActiveIndex(null)}
              >
                {sub}
              </SubLi>
            ))}
          </SubUl>
        </div>
      ))}
    </SideNavContainer>
  );
}
export default SideNav;
