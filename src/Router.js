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
import Login from "./DesktopView/routes/Login";
import Upload from "./DesktopView/routes/Upload";
import More from "./DesktopView/routes/More";
import Search from "./DesktopView/routes/Search";
import Chats from "./DesktopView/routes/Chats";
import UserInfo from "./DesktopView/routes/UserReview";
import WriteReview from "./DesktopView/routes/WriteReview";
import SignUp from "./DesktopView/routes/SignUp";
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
        <Route path="/user">
          <UserInfo />
        </Route>
        {/**
         *      <Route path="/img">
          <ImgFullPage />
        </Route>
         * 
         */}

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
        <Route path="/more" exact>
          <More />
        </Route>
        <Route path="/search">
          <Search />
        </Route>

        <Route path="/chat">
          <Chats />
        </Route>
        <Route path="/write">
          <WriteReview />
        </Route>

        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
