import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { Container } from "./Home";
import NoItem from "../components/NoItem";
import SideNav from "../components/SideNav";

import Paging from "../components/Paging";
import { itemsGroup } from "../../Data/ItemGroup";
import { ItemObj } from "../../Data/ItemObj";
import { ShowItem } from "../components/ShowItem";
import { useRecoilValue } from "recoil";
import { postData } from "../../atom";
import useAxios from "../../useAxio";

export const WrapDiv = styled(Container)`
  justify-content: space-evenly;
  display: flex;
  width: 1300px;
  padding: 0;
  margin: 140px auto;
  z-index: 1;
  position: relative;
  background-color: white;
  border-radius: 21px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 25px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 25px 60px -30px;
`;

export const CateContainer = styled.div`
  width: 950px;
  //margin: 0 auto;
  padding-top: 0;
  padding-bottom: 70px;
`;

//--------상위 카테고리-------//
export const TopCate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 30px;
  border-bottom: 3px solid rgb(167 167 167 / 28%);
`;
export const CategoryMain = styled.span`
  font-size: 26px;
  font-weight: 700;
  line-height: 85px;
  width: 50%;
  text-align: center;
  margin-bottom: 10px;
`;
export const CategoryUl = styled.ul`
  display: flex;
  width: 60%;
  position: relative;
  line-height: 30px;
`;
export const Categoryli = styled(Link)`
  //flex-grow: 1;
  width: 20%;
  text-align: center;
  cursor: pointer;

  z-index: 20;
  &:hover {
    font-weight: 800;
  }
`;

//--------현재 카테고리 정보 & Query-------//
export const CurrentCate = styled.div``;
export const CurrentCateAndQuery = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 5px 0px;
  ${CurrentCate} {
    display: flex;
    align-items: center;
    span {
      font-size: 17px;
      font-weight: 600;
    }
  }
`;

//------------Item Query-----------//
export const QueryDiv = styled.div``;
export const QueryUl = styled.ul`
  width: 30%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 0;
`;
export const QueryLi = styled.li`
  font-size: 14px;
  padding-left: 10px;
  &:not(:first-of-type) {
    border-left: 1px solid gray;
    padding-left: 20px;
    margin-left: 20px;
  }
  &:hover {
    font-weight: 700;
  }
  cursor: pointer;
  font-weight: ${(props) => (props.isActive ? "800" : "500")};
`;

//--------Item List-------//
export const ItemDiv = styled.div`
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
`;

export const ProductHeader = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  gap: 5px;
`;

//배너?
export const BackGround = styled.div`
  position: absolute;
  top: 0px;
  z-index: 0;
  min-width: 1300px;
  width: 100%;
  height: 549px;
  background: linear-gradient(360deg, rgba(255, 255, 255, 1) 0%, #ffffba 100%);
  transform: translate(0, -39%);
`;
//----------------end-------------------//

export const queryArray = ["최신등록순", "조회순", "관심순"];
function Group() {
  const data = useRecoilValue(postData);

  //url - 현재 카테고리 정보
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryValue = searchParams.get("category"); // id( = main category)
  const Group = itemsGroup.find((item) => item.id === Number(categoryValue));

  //현재 cate에 해당하는 item
  const [cateItem, setCateItem] = useState(
    data.filter((item) => item.main_category === Group.main)
  );
  //페이지네이션
  const pageValue = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(Number(pageValue));
  const [count, setCount] = useState();

  const postPerPage = 12; // 한 페이지 아이템 수

  const history = useHistory();
  const [currentQuery, setCurrentQuery] = useState(0);
  function changeQuery(index) {
    const searchParams = new URLSearchParams(location.search);
    setCurrentQuery(index);
    searchParams.set("query", index);
    history.push({ search: searchParams.toString() });
  }
  const { response, loading, error, executeGet } = useAxios({
    method: "get",
    url: `http://localhost:8080/main/${Group.main}/${currentQuery}`,
  });

  //강제 렌더링
  useEffect(() => {
    executeGet();
    setCurrentPage(Number(pageValue));
    setCount(cateItem.length);
  }, [categoryValue]); // 상위 카테고리 변경 시

  useEffect(() => {
    executeGet();
  }, [currentQuery]); // 쿼리 변경 시

  useEffect(() => {
    if (!loading && !error) {
      setCateItem(response);
    }
  }, [response, loading, error]);

  return (
    <div style={{ position: "relative" }}>
      <BackGround />
      <WrapDiv>
        <SideNav />
        <CateContainer>
          {/* 카테고리 Link */}
          <TopCate>
            <CategoryMain>{Group.main}</CategoryMain>
            <CategoryUl>
              {Group.sub.map((sub, index) => (
                <Categoryli
                  to={{
                    pathname: `/group/${categoryValue}`,
                    search: `?subitem=${sub}&page=${1}`,
                  }}
                  key={index}
                >
                  {sub}
                </Categoryli>
              ))}
            </CategoryUl>
          </TopCate>
          {/* 카테고리 끝 */}
          {cateItem.length > 0 ? (
            <>
              <CurrentCateAndQuery>
                <CurrentCate>
                  <span>
                    {Group.main} - 전체({cateItem.length})
                  </span>
                </CurrentCate>
                {/*Query*/}
                <QueryUl>
                  {queryArray.map((query, index) => (
                    <QueryLi
                      key={index}
                      onClick={() => {
                        changeQuery(index);
                      }}
                      isActive={index === currentQuery}
                    >
                      {query}
                    </QueryLi>
                  ))}
                </QueryUl>
              </CurrentCateAndQuery>

              <ItemDiv>
                <ShowItem
                  item={cateItem.slice(
                    postPerPage * (currentPage - 1),
                    postPerPage * (currentPage - 1) + postPerPage
                  )}
                  state={true}
                />
              </ItemDiv>
              <Paging
                page={currentPage}
                count={count}
                setCurrentPage={setCurrentPage}
                postPerPage={postPerPage}
              />
            </>
          ) : (
            <NoItem />
          )}
        </CateContainer>
      </WrapDiv>
    </div>
  );
}
export default Group;
