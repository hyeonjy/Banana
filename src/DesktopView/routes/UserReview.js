import { Link, useLocation } from "react-router-dom";
import {
  Header,
  MembershipText,
  ProfImg,
  MembershipWrap,
} from "../components/PostDatil";
import { ProfileName } from "../routes/MyPage";
import styled, { css } from "styled-components";
import { Container, ProductsBox } from "./More";
import { useEffect, useState } from "react";
import Modal, { GradeIcon, gradeList } from "../../Modal";
import { ShowItem, ShowReview } from "../components/ShowItem";
import NoItem from "../components/NoItem";
import useAxios from "../../useAxio";
import Skeleton from "react-loading-skeleton";
import { SkeletonReview } from "./SkeletonOfMypage";

import { DotWave } from "@uiball/loaders";
import { useQuery } from "react-query";
import { userPageApi } from "../../Api";
const UserContainer = styled(Container)`
  max-width: 800px;
  padding-top: 90px;
  filter: ${(props) => (props.activeGrade ? "blur(2px)" : "unset")};
`;
const UserWrap = styled.div`
  padding: 30px 45px;
  border-radius: 25px;
  min-width: 400px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;
const EachCate = styled(Link)`
  font-size: 14px;
  line-height: 40px;
  &:first-of-type {
    border-right: 1px solid #80808052;
  }
  background-color: ${(props) => (props.active ? "#ffe914" : "transparent")};
`;
const CateDiv = styled.div`
  display: flex;
  height: 40px;
  background-color: whitesmoke;
  align-items: center;
  ${EachCate} {
    flex-grow: 1;
    text-align: center;
  }
`;
const ItemDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 20px;
  width: 100%;
  min-height: 380px;
  ${(props) =>
    props.reviewPage &&
    css`
      flex-wrap: unset;
      flex-direction: column;
    `}
`;

function UserInfo() {
  //작성 유저 정보 찾기
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("id");
  const reviewPage = searchParams.get("review");

  const { data } = useQuery("userpage", () => userPageApi(userId));

  //모달
  const [activeGrade, setActiveGrade] = useState(false); // modal - 나머지 blur

  return (
    <>
      <UserContainer activeGrade={activeGrade}>
        <UserWrap>
          {data?.user ? (
            <>
              <Header as="div">
                <ProfImg img={require(`../../Img/${data.user.profile}`)} />
                <ProfileName style={{ fontSize: "17px" }}>
                  {data.user.nickname}
                </ProfileName>
                <MembershipWrap>
                  <GradeIcon
                    onClick={() => setActiveGrade(true)}
                    src={gradeList[data.user.grade].icon}
                  />
                  <MembershipText>
                    {gradeList[data.user.grade].grade}
                  </MembershipText>
                </MembershipWrap>
              </Header>
              <CateDiv>
                <EachCate
                  active={reviewPage === null ? 1 : 0}
                  to={{ pathname: "/user", search: `?id=${userId}` }}
                >
                  판매 목록
                </EachCate>
                <EachCate
                  active={reviewPage ? 1 : 0}
                  to={{ search: `id=${userId}&review=${true}` }}
                >
                  나눔 후기
                </EachCate>
              </CateDiv>
            </>
          ) : (
            <>
              <Header>
                <Skeleton
                  style={{ borderRadius: "100%", marginRight: "15px" }}
                  height={40}
                  width={40}
                />
                <ProfileName>
                  <Skeleton height={40} width={150} />
                </ProfileName>
                <MembershipWrap>
                  <Skeleton height={45} width={50} />
                </MembershipWrap>
              </Header>
              <CateDiv>
                <Skeleton height={50} />
              </CateDiv>
            </>
          )}
          <ItemDiv reviewPage={reviewPage}>
            {/* 유저 나눔 목록 & 후기 목록 */}
            {reviewPage &&
              (data?.reviews ? (
                data?.reviews.length > 0 ? (
                  <ShowReview reviews={data?.reviews} />
                ) : (
                  <NoItem content={"후기가"}>없습니다</NoItem>
                )
              ) : (
                <SkeletonReview />
              ))}
            {!reviewPage &&
              (data?.posts ? (
                data?.posts.length > 0 ? (
                  <ShowItem item={data?.posts} />
                ) : (
                  <NoItem content={"나눔이"}>없습니다</NoItem>
                )
              ) : (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <DotWave size={60} speed={1} color="#fae100" />
                </div>
                // <ProductsBox>
                //   {Array(8)
                //     .fill()
                //     .map((_, index) => (
                //       <Product layout="row" key={index}>
                //         <Skeleton height={"200px"} width={"50%"} />
                //       </Product>
                //     ))}
                // </ProductsBox>
              ))}
          </ItemDiv>
        </UserWrap>
      </UserContainer>

      {/* 클릭 시 모달 */}
      {activeGrade && <Modal setActiveGrade={setActiveGrade} />}
    </>
  );
}

export default UserInfo;
