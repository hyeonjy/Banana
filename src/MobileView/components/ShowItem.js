import { Link, Switch, useHistory, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { ItemObj } from "../../Data/ItemObj";
import { useState } from "react";
import { useEffect } from "react";
const ItemDiv = styled.div`
  width: 100%;
  height: auto;
  font-family: "Pretendard";
  min-height: calc(100vh - 360px - 160px);
  padding-top: ${(props) => (props.pad ? "60px" : "0px")};
  padding-bottom: ${(props) => (props.padBottom ? "60px" : "0px")};
`;
const ItemTitle = styled.span``;
const ItemContent = styled.span``;
const ItemArea = styled.span``;
const ItemTimeAgo = styled.span``;
const ItemText = styled.div`
  width: 60%;
  margin-top: 10px;
  ${ItemTitle} {
    font-size: 15px;
    font-weight: 800;
    display: block;
    margin-bottom: 7px;
  }
  ${ItemContent} {
    display: block;
    overflow: hidden; // 을 사용해 영역을 감출 것
    text-overflow: ellipsis; // 로 ... 을 만들기
    white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
    word-break: break-all;
    height: 20px;
    font-size: 13px;
    width: 100%;
    margin-bottom: 0px;
  }
  ${ItemArea} {
    margin-right: 6px;
    font-size: 12px;
    color: gray;
  }
  ${ItemTimeAgo} {
    font-size: 11px;
    color: gray;
  }
`;
const ItemImg = styled.img`
  width: 24%;
  height: 100%;
`;
const Item = styled.div`
  height: 90px;
  border-bottom: 1px solid #b6b6b663;
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;

const EmptyPage = styled.div`
  width: 100%;
  height: calc(100vh - 360px - 160px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;
const QueryDiv = styled.div`
  width: 90%;
  gap: 7px;
  display: flex;
  margin: 0px auto 3px 15px;
  position: sticky;
  top: 60px;
  background: white;
  padding: 7px 0;
`;
const QueryLi = styled.div`
  font-size: 14px;
  text-align: center;
  border-radius: 15px;
  border: 1px solid gray;
  padding: 9px 11px;
  ${(props) =>
    props.isActive &&
    css`
      background: orange;
      color: white;
      border: orange;
      font-weight: 700;
    `}
`;
const queryItem = ["최신등록순", "조회순", "관심순"];

// pad : paddingTop(최상단 header 유무)/ padBottom : 하단 메뉴 유무
// query : query block 존재 여부

export function ShowItemFn({
  item,
  pad = false,
  padBottom = false,
  query = false,
}) {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("query");

  const [currentQuery, setCurrentQuery] = useState();
  useEffect(() => {
    if (searchValue) {
      setCurrentQuery(Number(searchValue));
    }
  }, [searchValue]);

  const querySelect = (index) => {
    setCurrentQuery(index);
    //기존 url query string에 query항목 추가
    searchParams.set("query", index);
    history.push({
      pathname: `/search`,
      search: `?${searchParams}`,
    });
  };

  return (
    <div>
      {item.length > 0 ? (
        <ItemDiv pad={pad} padBottom={padBottom}>
          {query && (
            <QueryDiv>
              {queryItem.map((item, index) => (
                <QueryLi
                  onClick={() => {
                    querySelect(index);
                  }}
                  isActive={currentQuery === index ? true : false}
                  key={index}
                >
                  {item}
                </QueryLi>
              ))}
            </QueryDiv>
          )}
          {item.map((item, index) => (
            <Link to={`/clothes/${item.itemId}`} key={index}>
              <Item>
                <ItemText>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemContent>{item.content}</ItemContent>
                  <ItemArea>{item.area}</ItemArea>
                  <ItemTimeAgo>{item.timeAgo}</ItemTimeAgo>
                </ItemText>
                <ItemImg src={require(`../../Img/${item.img[0]}.jpg`)} />
              </Item>
            </Link>
          ))}
        </ItemDiv>
      ) : (
        <EmptyPage>나눔이 없습니다</EmptyPage>
      )}
    </div>
  );
}

function ShowItem({ main, sub }) {
  const filterItemObj = ItemObj.filter(
    (item) => item.main === main && item.sub === sub
  );
  return <ShowItemFn item={filterItemObj} />;
}
export default ShowItem;
