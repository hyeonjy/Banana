import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

const Container = styled.div`
  width: 100%;
  display: flex;
  /* align-items: center; */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 70px;
  z-index: 3;
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

const items = [
  {
    id: 0,
    main: "상의",
    sub: ["티셔츠", "블라우스", "셔츠", "니트", "아우터"],
  },
  {
    id: 1,
    main: "하의",
    sub: ["청바지", "슬랙스", "스커트", "레깅스", "기타"],
  },
  { id: 2, main: "신발", sub: ["운동화", "구두", "워커", "샌들", "슬리퍼"] },
  {
    id: 3,
    main: "악세서리",
    sub: ["목걸이", "반지", "귀걸이", "팔찌", "발찌"],
  },
  { id: 4, main: "패션잡화", sub: ["가방", "시계", "모자", "안경", "기타"] },
];

const ListBox = styled(Box)`
  width: 100%;
  height: 70px;
  text-align: center;
  /* margin-left: 100px; */
  /* background-color: orange; */
`;

const List = styled.li`
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

const SubList = styled.li`
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
  z-index: 6;
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
  const [isActive, setIsActive] = useState(false); /**서브 메뉴 활성화 여부 */
  const [select, setSelect] = useState(null); /** 현재 선택한 메인 메뉴 아이디*/

  const [showSubMenu, setShowSubMenu] = useState(false);
  const [selectCate, setSelctCate] = useState(false);

  const handleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };
  const handleSelctCate = (value) => {
    setSelctCate(value);
  };
  /** 커서 메뉴(+서브메뉴) 벗어나면 close */
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

  return (
    <>
      <Container onMouseEnter={handleSubMenu} onMouseLeave={handleSubMenu}>
        <MainContainer ref={mainCate}>
          <Box>
            <MenuIcon
              icon={faBars}
              onClick={() => {
                setIsActive(!isActive);
                setSelect(null);
              }}
            />
          </Box>

          <ListBox as="ul">
            {items.map((item, index) => (
              <List
                key={index}
                onMouseEnter={() => handleSelctCate(item.id)}
                onMouseLeave={() => handleSelctCate("")}
                border={selectCate === item.id}
              >
                {item.main}
              </List>
            ))}
          </ListBox>
        </MainContainer>
        {showSubMenu && (
          <>
            <SubContainer ref={subCate}>
              {items.map((mainCate, index) => (
                <SubListBox key={index}>
                  {mainCate.sub.map((subCate, idx) => (
                    <SubList key={idx}>{subCate}</SubList>
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
