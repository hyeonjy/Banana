import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Box = styled.div`
  width: 33%;
  display: flex;
  align-items: center;
`;

const MenuIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  margin-left: 12px;
  cursor: pointer;
`;

const ListBox = styled(Box)`
  align-items: center;
  justify-content: center;
`;

const List = styled.li`
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  ${(props) =>
    props.isBorder &&
    css`
      font-weight: 600;
      color: green;
    `}
`;

const ChoiceBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: black;
`;

const Choice = styled.li`
  color: white;
  font-size: 16px;
  font-weight: 400;
  margin: 30px;
  cursor: pointer;
`;

const items = [
  { id: "상의", name: ["니트", "아우터", "티셔츠", "블라우스", "셔츠"] },
  { id: "하의", name: ["청바지", "슬랙스", "스커트", "레깅스", "기타"] },
  { id: "신발", name: ["운동화", "구두", "워커", "샌들", "슬리퍼"] },
  { id: "악세서리", name: ["목걸이", "반지", "귀걸이", "팔찌", "발찌"] },
  { id: "패션잡화", name: ["가방", "시계", "모자", "안경", "기타"] },
];

const DropDown = (props) => {
  return (
    <ChoiceBox as="ul">
      {props.item.map((li) => (
        <Choice key={li}>{li}</Choice>
      ))}
    </ChoiceBox>
  );
};

function Nav() {
  const [isActive, setIsActive] = useState(false);
  const [item, setItem] = useState(null);
  const [itemID, setItemID] = useState(null);

  console.log("item:", item);
  console.log(isActive);
  return (
    <>
      <Container>
        <Box>
          <MenuIcon
            icon={faBars}
            onClick={() => {
              setIsActive(!isActive);
              setItem(items[0].name);
              setItemID(items[0].id);
            }}
          />
        </Box>
        <ListBox as="ul">
          {items.map((item) => (
            <List
              key={item.id}
              onClick={() => {
                {
                  isActive && item.id === itemID
                    ? setIsActive(false)
                    : setIsActive(true);
                }
                setItem(item.name);
                setItemID(item.id);
              }}
              isBorder={isActive && item.id === itemID}
            >
              {item.id}
            </List>
          ))}
        </ListBox>
        <Box />
      </Container>
      {isActive && <DropDown item={item} />}
    </>
  );
}

export default Nav;
