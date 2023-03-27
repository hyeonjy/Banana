import { BrowserRouter, Route, Switch } from "react-router-dom";
import Mhome from "./MobileView/routes/Mhome";
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