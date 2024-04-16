import React from "react";
import { Route, Routes } from "react-router";

import Home from "./Components/UserFeedback/Home";

//Feedback
import AddRate from "./Components/UserFeedback/Feedback/Add-Rates/AddRate";
import RateDetails from "./Components/UserFeedback/Feedback/Rate/RateDetails";
//Complaint
import ValidatedDetails from "./Components/UserFeedback/Complaints/Complaints/MyComplaints";
import AddComplaint from "./Components/UserFeedback/Complaints/Add-Complaint/AddComplaint";
import MyRate from "./Components/UserFeedback/Feedback/MyRate/MyRate";
import UpdateRate from "./Components/UserFeedback/Feedback/UpdateRate/UpdateRate";
import UpdateComplaint from "./Components/UserFeedback/Complaints/UpdateComplaint/UpdateComplaint";
import AdminDash from "./Components/UserFeedback/Complaints/AdminDash/AdminDash";
import Reply from "./Components/UserFeedback/Complaints/AdminDash/Reply";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />

          {/*Feedback and Rating*/}
          <Route path="/add-feedback" element={<AddRate />} />
          <Route path="/ratedetails" element={<RateDetails />} />
          <Route path="/myrate" element={<MyRate />} />
          <Route path="/updaterate/:id" element={<UpdateRate />} />

          {/*Complaint*/}
          <Route path="/validatedDetails" element={<ValidatedDetails />} />
          <Route path="/add-complaint" element={<AddComplaint />} />
          <Route path="/updatecomplaint/:id" element={<UpdateComplaint />} />
          <Route path="/admindash" element={<AdminDash />} />
          <Route path="/reply/:id" element={<Reply />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
