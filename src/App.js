import { BrowserView, MobileView } from "react-device-detect";
import styled, { createGlobalStyle } from "styled-components";
import { MobileRouter } from "./Mrouter";
import { DeskTopRouter } from "./Router";
import { useRecoilState } from "recoil";
import { postData } from "./atom";
import { useEffect } from "react";
import useAxios from "./useAxio";
import { DotWave } from "@uiball/loaders";
import { Pulsar } from "@uiball/loaders";
const GlobalStyle = createGlobalStyle`

  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video,input, textarea,select,option {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  font-family: Pretendard;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
  position: relative;
}

menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a{
  text-decoration: none;
  color: inherit;
}
button{
  font-family: Pretendard;
}
`;
const Banana = styled.span`
  color: #fae100;
  font-size: 40px;
  font-family: yg-jalnan;
  margin-bottom: 20px;
`;

function App() {
  const [posts, setPosts] = useRecoilState(postData);
  const { response, loading, error, executeGet } = useAxios({
    method: "get",
    url: "http://localhost:8080/data/last",
  });

  useEffect(() => {
    executeGet();
    console.log("app.js");
  }, []);
  useEffect(() => {
    if (!loading && !error && response) {
      console.log(response);
      setPosts(response);
    }
  }, [response, loading, error]);
  return (
    <>
      <GlobalStyle />
      <BrowserView>
        {loading || error || posts.length === 0 ? (
          <div className="loadingWrap">
            <Banana>BANANA</Banana>
            <Pulsar size={60} speed={1.75} color="#fae100" />
            {/* <DotWave size={60} speed={1} color="#fae100" /> */}
          </div>
        ) : (
          <>
            <DeskTopRouter />
          </>
        )}
      </BrowserView>
      <MobileView>
        {loading || error || posts.length === 0 ? (
          <div className="loadingWrap">
            <Banana>BANANA</Banana>
            <Pulsar size={60} speed={1.75} color="#fae100" />
            {/* <DotWave size={60} speed={1} color="#fae100" /> */}
          </div>
        ) : (
          <MobileRouter />
        )}
      </MobileView>
    </>
  );
}

export default App;
