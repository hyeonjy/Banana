import { Link, Switch, useHistory, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { ItemObj } from "../../Data/ItemObj";
import { useState } from "react";
import { useEffect } from "react";
import { ProductHeader } from "../../DesktopView/routes/Gruop";
import useAxios from "../../useAxio";
import { useRecoilValue } from "recoil";
import { postData } from "../../atom";
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
    max-width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  margin-top: ${(props) => (props.profile ? "0" : "60px")};
  height: ${(props) =>
    props.profile ? "110px" : "calc(100vh - 360px - 160px)"};
  /* background-color: orange; */
  color: rgba(0, 0, 0, 0.3);
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

const ItemState = styled.div`
  width: 20%;
  padding: 2px 1px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 20px;
  color: white;
  background: ${(props) => props.color || "black"};
  border-radius: 15px;
  font-size: 10px;
`;

const queryItem = ["최신등록순", "조회순", "관심순"];

// pad : paddingTop(최상단 header 유무)/ padBottom : 하단 메뉴 유무
// query : query block 존재 여부

// const [postItem, setPostItem] = useState();

export function ShowItemFn({
  item,
  pad = false,
  padBottom = false,
  query = false,
  profile = false,
}) {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("query");
  const [currentQuery, setCurrentQuery] = useState();
  const [postItem, setPostItem] = useState();

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

          {item.map((item, index) => {
            const datetime = new Date(item.post_date);
            const now = new Date();
            const diffInMs = now - datetime;
            const diffInMinutes = Math.round(diffInMs / (1000 * 60));
            let timeago = null;
            if (diffInMinutes < 60) {
              timeago = `${diffInMinutes}분 전`;
            } else if (diffInMinutes < 60 * 24) {
              timeago = `${Math.floor(diffInMinutes / 60)}시간 전`;
            } else {
              timeago = `${Math.floor(diffInMinutes / (60 * 24))}일 전`;
            }
            return (
              <Link to={`/clothes/${item.post_id}`} key={index}>
                <Item>
                  <ItemText>
                    <ProductHeader>
                      <ItemTitle>{item.title}</ItemTitle>
                      {item.state === "complete" && (
                        <ItemState color="gray">
                          <span>나눔완료</span>
                        </ItemState>
                      )}
                      {item.state === "reservate" && (
                        <ItemState color="orange">
                          <span>예약중</span>
                        </ItemState>
                      )}
                    </ProductHeader>
                    <ItemContent>{item.content}</ItemContent>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <ItemArea>{item.area}</ItemArea>
                        <ItemTimeAgo>{timeago}</ItemTimeAgo>
                      </div>
                    </div>
                  </ItemText>
                  <ItemImg src={require(`../../Data/Img/${item.img_src}`)} />
                </Item>
              </Link>
            );
          })}
        </ItemDiv>
      ) : (
        <EmptyPage profile={profile}>나눔물품이 없습니다</EmptyPage>
      )}
    </div>
  );
}

function ShowItem({ main, sub }) {
  const response = useRecoilValue(postData);
  useEffect(() => {
    response.filter(
      (item) => item.main_category === main.main && item.sub_category === sub
    );
  }, [response]);

  return (
    <ShowItemFn
      item={response.filter(
        (item) => item.main_category === main.main && item.sub_category === sub
      )}
    />
  );
}
export default ShowItem;
