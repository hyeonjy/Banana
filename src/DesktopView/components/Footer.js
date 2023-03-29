import {
  faBlogger,
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;
const BoxContent = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 100px;
`;
const Box = styled.div`
  width: 100%;
  margin-bottom: 30px;

  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    ${BoxContent} {
      width: fit-content;
    }
  }
`;

const BoxContent2 = styled(BoxContent)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-right: 100px;
`;

const ContentTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
  margin: 50px 15px;
  margin-bottom: 20px;
`;

const ContentSpan = styled.span`
  font-size: 15px;
  color: rgba(0, 0, 0, 0.4);
  margin: 3px 15px;
`;

const SNSIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
  color: rgba(0, 0, 0, 0.4);
  margin: 14px;
  cursor: pointer;
`;

const SecondBox = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;

function Footer() {
  return (
    <Container>
      <Box>
        <BoxContent>
          <ContentTitle>바나나 대표자 정보</ContentTitle>
          <ContentSpan>대표| 김현지, 황지나 | 전화번호 1234-5678</ContentSpan>
          <ContentSpan>서울특별시 바나나구 달콤로 30-5</ContentSpan>
          <ContentSpan>메일 | banana@bananacustomer.com</ContentSpan>
        </BoxContent>
        <BoxContent2>
          <SNSIcon icon={faFacebook} color={"blue"} />
          <SNSIcon icon={faBlogger} color={"green"} />
          <SNSIcon icon={faYoutube} color={"red"} />
          <SNSIcon icon={faInstagram} color={"pink"} />
        </BoxContent2>
      </Box>
      <SecondBox>
        <ContentSpan>이용안내</ContentSpan>
        <ContentSpan>이용약관</ContentSpan>
        <ContentSpan>개인정보처리방침</ContentSpan>
        <ContentSpan>광고문의</ContentSpan>
      </SecondBox>
    </Container>
  );
}

export default Footer;
