import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { itemsGroup } from "../ItemGroup";

const Container = styled.div`
  width: 100%;
  display: flex;
  /* align-items: center; */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 70px;
  z-index: 21;
  flex-direction: column;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  cursor: pointer;
  margin-left: 15px;
  display: none;
`;

const ListBox = styled(Box)`
  width: 100%;
  height: 70px;
  text-align: center;
  /* margin-left: 100px; */
  /* background-color: orange; */
`;

const List = styled(Link)`
  height: 70px;

  padding: 25px 0;
  font-size: 17px;
  cursor: pointer;
  width: 140px;
  box-sizing: border-box;

  font-weight: 600;
  flex-shrink: 0;
  /* background-color: yellow; */
  position: relative;
  ${(props) =>
    props.border &&
    css`
      font-weight: 600;
      color: #e62a2a;
      border-bottom: 5px solid #e62a2a;
    `}
`;

const SubListBox = styled.div`
  height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  color: black;
  box-sizing: border-box;
`;

const SubList = styled(Link)`
  width: 140px;
  font-size: 14px;
  flex-grow: 1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 5px 0;
  font-weight: 400;
  background-color: white;
  transition: all 0.1s;
  align-items: center;
  border-radius: 10px;
  &:hover {
    font-weight: 700;
    background-color: #dcdcdc66;
  }
`;

const MainContainer = styled.div`
  background-color: white;
  height: 70px;
  display: flex;
  justify-content: center;
`;
const SubContainer = styled.div`
  width: 100%;
  height: 220px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 25px;
  z-index: 150;
`;
const Blur = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  width: 100vw;
  height: 100vh;
  z-index: 5;
`;

function Nav() {
  const [showSubMenu, setShowSubMenu] = useState(false); //서브 메뉴 활성화 여부
  const [selectCate, setSelctCate] = useState(false); //현재 hover한 카테고리
  const handleSelctCate = (value) => {
    setSelctCate(value);
  };
  /** 커서가 메뉴(+서브메뉴) 벗어나면 close */
  const mainCate = useRef();
  const subCate = useRef();
  useEffect(() => {
    const CloseSubList = (event) => {
      if (
        mainCate.current &&
        subCate.current &&
        !mainCate.current.contains(event.target) &&
        !subCate.current.contains(event.target)
      ) {
        setShowSubMenu(false);
      }
    };
    window.addEventListener("mouseover", CloseSubList);
    return () => {
      window.removeEventListener("mouseover", CloseSubList);
    };
  }, []);
  //////
  return (
    <>
      <Container>
        <MainContainer ref={mainCate}>
          <Box>
            <MenuIcon icon={faBars} />
          </Box>

          <ListBox as="ul">
            {itemsGroup.map((item, index) => (
              <List
                to={{
                  pathname: "/group",
                  search: `?category=${item.id}&page=${1}`,
                }}
                key={index}
                onMouseEnter={() => {
                  handleSelctCate(item.id);
                  setShowSubMenu(true);
                }}
                onMouseLeave={() => {
                  handleSelctCate("");
                }}
                onClick={() => {
                  setShowSubMenu(false);
                }}
                border={selectCate === item.id ? 1 : 0}
              >
                {item.main}
              </List>
            ))}
          </ListBox>
        </MainContainer>

        {/* mouseEnter -> Submenu */}
        {showSubMenu && (
          <>
            <SubContainer ref={subCate}>
              {itemsGroup.map((mainCate, index) => (
                <SubListBox key={index}>
                  {mainCate.sub.map((subCate, idx) => (
                    <SubList
                      to={{
                        pathname: `/group/${mainCate.id}`,
                        search: `?subitem=${subCate}&page=${1}`,
                      }}
                      key={idx}
                      onClick={() => {
                        setShowSubMenu(false);
                      }}
                    >
                      {subCate}
                    </SubList>
                  ))}
                </SubListBox>
              ))}
            </SubContainer>
            <Blur />
          </>
        )}
      </Container>
    </>
  );
}

export default Nav;
