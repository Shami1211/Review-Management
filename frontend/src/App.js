import React from "react";
import { Route, Routes } from "react-router";

import AddRate from "./Components/UserFeedback/Feedback/Add-Rates/AddRate";
import RateDetails from "./Components/UserFeedback/Feedback/Rate/RateDetails";

import AddComplaint from "./Components/UserFeedback/Complaints/Add-Complaint/AddComplaint";
import ComplaintDetails from "./Components/UserFeedback/Complaints/Complaints/ComplaintDetails";


function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          

          {/*Feedback and Rating*/}
          <Route path="/add-feedback" element={<AddRate />} />
          <Route path="/ratedetails" element={<RateDetails />} />



           {/*Feedback and Rating*/}
           <Route path="/add-complaint" element={<AddComplaint />} />
           <Route path="/complaints" element={<ComplaintDetails />} />
  
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
