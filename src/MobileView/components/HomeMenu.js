import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuSpan = styled.div`
  cursor: pointer;
`;
const MenuDiv = styled.div`
  background-color: #ebebeb;
  width: 100%;
  height: 65px;
  position: fixed;
  border-radius: 20px 20px 0 0;
  bottom: 0;
  display: flex;
  font-size: 14px;
  justify-content: space-around;
  align-items: center;
  font-weight: 700;
  color: #515151;
  font-family: "Pretendard";
  z-index: 998;
`;

const MenuList = [
  { name: "HOME", url: "/" },
  { name: "채팅하기", url: "/chats" },
  { name: "지역별", url: "/region?region=전체보기" },
  { name: "마이페이지", url: "/mypage" },
];
const existUser = true;
function HomeMenu() {
  return (
    <MenuDiv>
      {MenuList.map((Menu, index) => {
        return (
          <Link
            to={
              index === 0 || index === 2
                ? Menu.url
                : existUser
                ? Menu.url
                : "/login"
            }
            key={index}
          >
            <MenuSpan>{Menu.name}</MenuSpan>
          </Link>
        );
      })}
    </MenuDiv>
  );
}

export default HomeMenu;
