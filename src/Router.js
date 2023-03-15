import { BrowserRouter, Route, Switch } from "react-router-dom";
export function MobileRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          모바일
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
          데스크탑
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
