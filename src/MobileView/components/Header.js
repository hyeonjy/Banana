import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
const Header = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  background-color: white;
  width: 92%;
  height: 25px;
  padding: 15px 4%;
  z-index: 999;
  align-items: center;
`;
const Logo = styled.span`
  font-size: 20px;
  color: #ffe84e;
  font-weight: 800;
  font-family: "yg-jalnan";
`;
const Icons = styled.div`
  width: fit-content;
  line-height: 33px;
  font-size: 25px;
`;
const SerchForm = styled.form`
  display: block;
  display: flex;
  margin-right: 10px;
  display: inline-block;
  position: relative;
  border-bottom: ${(props) => (props.toggle ? "1px solid black" : "0px")};
  padding-bottom: 4px;
`;
const InputText = styled.input`
  display: inline-block;
  height: 25px;
  outline: none;

  border-radius: 10px;
  width: ${(props) => (props.toggle ? "40vw" : "0vw")};
  border: 0px;
  background: none;

  transition: width 0.4s cubic-bezier(0, 0.795, 0, 1);
  cursor: pointer;
`;
const InputBtn = styled.input`
  display: inline-block;
  border: 0px;
  z-index: 55;
  color: transparent;
  width: 30px;
  height: 25px;

  background: white
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADNQTFRFU1NT9fX1lJSUXl5e1dXVfn5+c3Nz6urqv7+/tLS0iYmJqampn5+fysrK39/faWlp////Vi4ZywAAABF0Uk5T/////////////////////wAlrZliAAABLklEQVR42rSWWRbDIAhFHeOUtN3/ags1zaA4cHrKZ8JFRHwoXkwTvwGP1Qo0bYObAPwiLmbNAHBWFBZlD9j0JxflDViIObNHG/Do8PRHTJk0TezAhv7qloK0JJEBh+F8+U/hopIELOWfiZUCDOZD1RADOQKA75oq4cvVkcT+OdHnqqpQCITWAjnWVgGQUWz12lJuGwGoaWgBKzRVBcCypgUkOAoWgBX/L0CmxN40u6xwcIJ1cOzWYDffp3axsQOyvdkXiH9FKRFwPRHYZUaXMgPLeiW7QhbDRciyLXJaKheCuLbiVoqx1DVRyH26yb0hsuoOFEPsoz+BVE0MRlZNjGZcRQyHYkmMp2hBTIzdkzCTc/pLqOnBrk7/yZdAOq/q5NPBH1f7x7fGP4C3AAMAQrhzX9zhcGsAAAAASUVORK5CYII=)
    no-repeat;
  background-size: contain;
  padding: 1px 2px;
`;

function HeaderComponent() {
  const [searchBtnClick, setSearchBtnClick] = useState(false);

  return (
    <Header>
      <Logo>BANANA</Logo>
      <Icons>
        <SerchForm action="" autocomplete="on" toggle={searchBtnClick}>
          <InputText
            id="search"
            name="search"
            type="text"
            placeholder="검색어를 입력하세요"
            toggle={searchBtnClick}
          />
          <InputBtn
            onClick={(e) => {
              e.preventDefault();
              setSearchBtnClick((prev) => !prev);
            }}
            id="search_submit"
            value="검색"
            type="submit"
          />
        </SerchForm>
        {/*<FontAwesomeIcon icon={faMagnifyingGlass} color="gray" />
         */}
        <FontAwesomeIcon
          style={{ display: "inline-block", verticalAlign: "middle" }}
          icon={faHeart}
          color="red"
        />
      </Icons>
    </Header>
  );
}
export default HeaderComponent;
