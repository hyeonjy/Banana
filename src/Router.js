import { BrowserRouter, Route, Switch } from "react-router-dom";
import Mhome from "./MobileView/routes/Mhome";
import Home from "./DesktopView/routes/Home";
import MyPage from "./DesktopView/routes/MyPage";
import Header from "./DesktopView/components/Header";
import Post from "./DesktopView/routes/Post";
import Footer from "./DesktopView/components/Footer";
import MDetailpost from "./MobileView/routes/MDetailpost";
import Mmypage from "./MobileView/routes/Mmypage";
import Mbasket from "./MobileView/routes/Mbasket";
import Mshare from "./MobileView/routes/Mshare";

export function MobileRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Mhome />
        </Route>

        <Route exact path="/clothes/:clothesid">
          <MDetailpost />
        </Route>

        <Route exact path="/mypage">
          <Mmypage />
        </Route>

        <Route exact path="/mypage/basket">
          <Mbasket />
        </Route>

        <Route exact path="/mypage/share">
          <Mshare />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export function DeskTopRouter() {
  return (
    <BrowserRouter>
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
