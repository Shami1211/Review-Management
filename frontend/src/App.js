import React from "react";
import { Route, Routes } from "react-router";

import Home from "./Components/UserFeedback/Home";

//Feedback
import AddRate from "./Components/UserFeedback/Feedback/Add-Rates/AddRate";
import RateDetails from "./Components/UserFeedback/Feedback/Rate/RateDetails";

//Complaint
import Validate from "./Components/UserFeedback/Complaints/Complaints/Validate";
import ValidatedDetails from "./Components/UserFeedback/Complaints/Complaints/MyComplaints";
import AddComplaint from "./Components/UserFeedback/Complaints/Add-Complaint/AddComplaint";
import ComplaintDetails from "./Components/UserFeedback/Complaints/Complaints/ComplaintDetails";


function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
        <Route path="/" element={<Home />} />

          {/*Feedback and Rating*/}
          <Route path="/add-feedback" element={<AddRate />} />
          <Route path="/ratedetails" element={<RateDetails />} />



           {/*Complaint*/}
           <Route path="/validate" element={<Validate />} />
        <Route path="/validatedDetails" element={<ValidatedDetails />} />
           <Route path="/add-complaint" element={<AddComplaint />} />
           <Route path="/complaints" element={<ComplaintDetails />} />
  
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
