import React, { useState, useEffect } from "react";
import axios from "axios";
import { validateEmail } from "./Validate"; // Corrected import statement

const MyComplaints = () => {
  const [email, setEmail] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("http://localhost:8080/complaints");
      setComplaints(response.data.complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleSearch = () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    const filtered = complaints.filter((complaint) => complaint.email === email);
    setFilteredComplaints(filtered);
    setError("");
  };

  return (
    <div>
      <h1>My Complaints</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p>{error}</p>}
      {filteredComplaints.length > 0 ? (
        <div>
          {filteredComplaints.map((complaint) => (
            <div key={complaint._id}>
              <p>Username: {complaint.username}</p>
              <p>Email: {complaint.email}</p>
              <p>Complaint: {complaint.complaint}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No complaints found for this email.</p>
      )}
    </div>
  );
};

export default MyComplaints;
