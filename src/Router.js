import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./DesktopView/routes/Home";
import MyPage from "./DesktopView/routes/MyPage";
import Header from "./DesktopView/components/Header";
import Post from "./DesktopView/routes/Post";
import Footer from "./DesktopView/components/Footer";
import ScrollToTop from "./ScrollToTop";

export function DeskTopRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/mypage">
          <MyPage />
        </Route>
        <Route path="/post/:postId">
          <Post />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
