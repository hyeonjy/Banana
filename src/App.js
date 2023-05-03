import { BrowserView, MobileView } from "react-device-detect";
import { createGlobalStyle } from "styled-components";
import { MobileRouter } from "./Mrouter";
import { DeskTopRouter } from "./Router";
import { useRecoilState } from "recoil";
import { postData } from "./atom";
import { useEffect } from "react";
import useAxios from "./useAxio";

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
function App() {
  const [posts, setPosts] = useRecoilState(postData);
  const { response, loading, error } = useAxios({
    method: "get",
    url: "http://localhost:8080/data",
  });
  useEffect(() => {
    console.log(response);
    if (!loading) {
      console.log(response);
      setPosts(response);
    }
  }, [response, loading, error]);
  return (
    <>
      <GlobalStyle />
      <BrowserView>
        {loading ? <span>loading...</span> : <DeskTopRouter />}
      </BrowserView>
      <MobileView>
        {loading ? <span>loading...</span> : <MobileRouter />}
      </MobileView>
    </>
  );
}

export default App;
