import { BrowserRouter, Route, Switch } from "react-router-dom";
import Mhome from "./MobileView/routes/Mhome";
import Home from "./DesktopView/routes/Home";
export function MobileRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Mhome />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export function DeskTopRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
