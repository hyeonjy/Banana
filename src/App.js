import { BrowserView, MobileView } from "react-device-detect";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <BrowserView>데스크톱브라우져!</BrowserView>
      <MobileView>모바일 브라우져~!</MobileView>
    </BrowserRouter>
  );
}

export default App;
