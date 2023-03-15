import { BrowserView, MobileView } from "react-device-detect";

function App() {
  return (
    <div>
      <BrowserView>데스크톱브라우져!</BrowserView>
      <MobileView>모바일 브라우져~!</MobileView>
    </div>
  );
}

export default App;
