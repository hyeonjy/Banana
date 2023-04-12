import { BrowserRouter, Route, Switch } from "react-router-dom";
import Mhome from "./MobileView/routes/Mhome";
import MDetailpost from "./MobileView/routes/MDetailpost";
import Mmypage from "./MobileView/routes/Mmypage";
import Mbasket from "./MobileView/routes/Mbasket";
import Mshare from "./MobileView/routes/Mshare";
import Mimages from "./MobileView/routes/Mimages";
import Mlogin from "./MobileView/routes/Mlogin";
import MUpload from "./MobileView/routes/MUpload";
import Chats from "./MobileView/routes/Chats";
import Chat from "./MobileView/routes/Chat";
import Msearch from "./MobileView/routes/Msearch";
import ScrollToTop from "./ScrollToTop";
import Region from "./MobileView/routes/Region";
import MReview from "./MobileView/routes/MReview";
import MProfileReview from "./MobileView/routes/MProfileReview";
import MWriteReview from "./MobileView/routes/MWriteReview";

export function MobileRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact>
          <Mhome />
        </Route>

        <Route path="/login" exact>
          <Mlogin />
        </Route>

        <Route exact path="/clothes/:clothesid">
          <MDetailpost />
        </Route>

        <Route exact path="/images">
          <Mimages />
        </Route>

        <Route exact path="/mypage">
          <Mmypage />
        </Route>

        <Route exact path="/mypage/basket">
          <Mbasket />
        </Route>

        <Route exact path="/share">
          <Mshare />
        </Route>

        <Route exact path="/upload">
          <MUpload />
        </Route>

        <Route exact path="/chats">
          <Chats />
        </Route>

        <Route exact path="/chat">
          <Chat />
        </Route>

        <Route exact path="/search">
          <Msearch />
        </Route>
        <Route exact path="/region">
          <Region />
        </Route>

        <Route exact path="/review">
          <MReview />
        </Route>

        <Route exact path="/write">
          <MWriteReview />
        </Route>

        <Route exact path="/profile">
          <MProfileReview />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
