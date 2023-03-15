import { BrowserView, MobileView } from "react-device-detect";
import { DeskTopRouter, MobileRouter } from "./Router";

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
