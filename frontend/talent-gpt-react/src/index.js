import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Behaviorial from "./pages/Behavorial/Behavorial";
import Coding from "./pages/Coding/Coding";
import CandidateList from "./pages/CandidateList/CandidateList";
import Jobdescription from "./pages/JobDescription/Jobdescription";
import Navbar from "./components/Navbar/Navbar";
import Criteria from "./pages/Criteria/Criteria";
import Results from "./pages/Results/Results";
import EndInterview from "./pages/EndInterview/EndInterview";
function Index() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Jobdescription />} />
          <Route exact path="/job" element={<Jobdescription />} />
          <Route exact path="/coding" element={<Coding />} />
          <Route exact path="/behavorial" element={<Behaviorial />} />
          <Route exact path="/candidates" element={<CandidateList />} />
          <Route exact path="/criteria" element={<Criteria />} />
          <Route exact path="/link/:interview_id" element={<Results />} />
          <Route exact path="/end" element={<EndInterview />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Index />);
