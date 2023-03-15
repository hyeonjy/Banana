import { BrowserRouter, Route, Switch } from "react-router-dom";
import Mhome from "./MobileView/routes/mHome";
import Home from "./DesktopView/routes/Home";
export function MobileRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={<Mhome />} />
      </Switch>
    </BrowserRouter>
  );
}
export function DeskTopRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={<Home />} />
      </Switch>
    </BrowserRouter>
  );
}
