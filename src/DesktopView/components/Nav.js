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
  font-size: 18px;
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
      border-bottom: 3px solid #e62a2a;
      ${SubList} {
        /* font-weight: 600; */
      }
    `}
`;

const SubListBox = styled.div`
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  color: black;
  /*margin-top: 28px;*/

  /* background-color: green; */
  box-sizing: border-box;
  position: absolute;
  top: 100%;
`;

const SubList = styled.li`
  width: 140px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 5px 0;
  font-weight: 400;
  background-color: white;
  &:hover {
    font-weight: 700;
  }
  ${(props) =>
    props.isBorder &&
    css`
      &:hover {
        color: #e62a2a;
      }
    `}
`;

const MainContainer = styled(Container)`
  background-color: white;
`;
const SubContainer = styled.div`
  width: 100%;
  height: 230px;
  background-color: white;
`;

function Nav() {
  const [isActive, setIsActive] = useState(false); /**서브 메뉴 활성화 여부 */
  const [select, setSelect] = useState(null); /** 현재 선택한 메인 메뉴 아이디*/

  /** 메뉴를 제외한 요소 클릭 시 서브메뉴 창 닫는 코드 */
  const el = useRef();

  useEffect(() => {
    window.addEventListener("click", CloseSubList);
    return () => {
      window.removeEventListener("click", CloseSubList);
    };
  }, []);

  const CloseSubList = (e) => {
    if (!el.current.contains(e.target)) setIsActive(false);
  };

  const [showSubMenu, setShowSubMenu] = useState(false);
  const [selectCate, setSelctCate] = useState(false);

  const handleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };
  const handleSelctCate = (value) => {
    setSelctCate(value);
  };
  return (
    <>
      <Container ref={el}>
        <MainContainer>
          <Box>
            <MenuIcon
              icon={faBars}
              onClick={() => {
                setIsActive(!isActive);
                setSelect(null);
              }}
            />
          </Box>

          <ListBox
            onMouseEnter={handleSubMenu}
            onMouseLeave={handleSubMenu}
            as="ul"
          >
            {items.map((item, index) => (
              <List
                key={index}
                onClick={() => {
                  {
                    isActive && item.id === select
                      ? setIsActive(false)
                      : setIsActive(true);
                  }
                  setSelect(item.id);
                }}
                //isBorder={isActive && item.id === select}
                onMouseEnter={() => handleSelctCate(item.id)}
                onMouseLeave={() => handleSelctCate("")}
                border={selectCate === item.id}
              >
                {item.main}
                {showSubMenu && (
                  <SubListBox as="ul">
                    {item.sub.map((li, idx) => {
                      return (
                        <SubList
                          key={idx}
                          isBorder={isActive && item.id === select}
                        >
                          {li}
                        </SubList>
                      );
                    })}
                  </SubListBox>
                )}
              </List>
            ))}
          </ListBox>
        </MainContainer>
        {/* 없어도 되는거 아냐?    {isActive && <SubContainer />} */}
      </Container>
    </>
  );
}

export default Nav;
