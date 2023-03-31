import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./DesktopView/routes/Home";
import MyPage from "./DesktopView/routes/MyPage";
import Header from "./DesktopView/components/Header";
import Post from "./DesktopView/routes/Post";
import Footer from "./DesktopView/components/Footer";
import ScrollToTop from "./ScrollToTop";
import ImgFullPage from "./DesktopView/routes/ImgFullPage";
import Gruop from "./DesktopView/routes/Gruop";
import SubGroup from "./DesktopView/routes/SubGroup";
import Login from "./DesktopView/components/Login";
import Upload from "./DesktopView/routes/Upload";

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
        <Route path="/img">
          <ImgFullPage />
        </Route>
        <Route path="/group" exact>
          <Gruop />
        </Route>
        <Route path="/group/:main" exact>
          <SubGroup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/upload" exact>
          <Upload />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
