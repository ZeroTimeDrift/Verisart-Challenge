import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import CertificateForm from "../components/certificateform";
import CertficateDisplay from "../components/certificatedisplay";
export default function RouterRoutes() {
    return (
      <Router>    
        <Routes>
          <Route path="/" element={<CertficateDisplay/>}/>
          <Route path="/create" element={<CertificateForm/>}/>
        </Routes>
    </Router>
    );
  }

