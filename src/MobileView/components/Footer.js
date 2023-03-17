import styled from "styled-components";

const FooterDiv = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  font-size: 11px;
  color: #838383;
  align-items: center;
  justify-content: center;
  margin-bottom: 65px;
`;

function Footer() {
  return (
    <FooterDiv>
      <p>Copyright &copy; 2023. 김현지, 황지나. </p>
      <span>
        바나나 대표자 정보
        <br /> 대표| 김현지, 황지나 | 전화번호 1234-5678
        <br /> 서울특별시 바나나구 달콤로 30-5
        <br /> 메일 | banana@bananacustomer.com
      </span>
    </FooterDiv>
  );
}
export default Footer;
