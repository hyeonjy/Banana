import { BrowserView, MobileView } from "react-device-detect";
import { BrowserRouter, Routes, Route, Link, Switch } from "react-router-dom";
import Desktopnext from "./desktopnext";
import MovileNext from "./movilenext";
import { DeskTopRouter, MobileRouter } from "./Router";

const Home = ({ aa }) => {
  return <h1>{aa}</h1>;
};

function App() {
  return (
    <>
      <BrowserView>
        <DeskTopRouter />
      </BrowserView>
      <MobileView>
        <MobileRouter />
      </MobileView>
    </>
  );
}

export default App;
