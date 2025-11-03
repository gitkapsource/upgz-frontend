import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PhoneNumberManagement from "./PhoneNumberManagement";
import SipTrunkManagement from "./SipTrunkManagement";
import AppMenuBar from "./AppMenuBar";

function App() {
  return (
    <Router>
      <AppMenuBar />
      <Routes>
        <Route path="/" element={<PhoneNumberManagement />} />
        <Route path="/sip-trunks" element={<SipTrunkManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
