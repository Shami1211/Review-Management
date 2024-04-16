import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Rate.css";
import StarIcon from "@mui/icons-material/Star";

const URL = "http://localhost:8080/complaints";

const ComplaintDetails = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    username: "",
    email: "",
    complaint: "",
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(URL);
      setComplaints(response.data.complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleSearch = () => {
    const filteredComplaints = complaints.filter((complaint) =>
      Object.values(complaint).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setComplaints(filteredComplaints);
    setNoResults(filteredComplaints.length === 0);
  };

  const handleUpdate = (id) => {
    const selectedComplaint = complaints.find((complaint) => complaint._id === id);
    if (selectedComplaint) {
      setUpdateData({
        id: selectedComplaint._id,
        username: selectedComplaint.username,
        email: selectedComplaint.email,
        complaint: selectedComplaint.complaint,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/${updateData.id}`, {
        username: updateData.username,
        email: updateData.email,
        complaint: updateData.complaint,
      });
      fetchComplaints(); // Refresh complaints after update
      setUpdateData({
        id: "",
        username: "",
        email: "",
        complaint: "",
      });
    } catch (error) {
      console.error("Error updating complaint:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        setComplaints((prevComplaints) => prevComplaints.filter((complaint) => complaint._id !== id));
      } catch (error) {
        console.error("Error deleting complaint:", error);
      }
    }
  };

  return (
    <div>
      <div className="film_box_details">
        <button className="add_rate" onClick={() => (window.location.href = "./add-complaint")}>
          Add Complaint
        </button>
        <h1 className="cen_h1">Complaints</h1>
        <div className="cen_box">
          <div>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              className="serch_inpt"
              placeholder="Search And Review Complaints"
            ></input>
            <button onClick={handleSearch} className="seachbtn">
              Search
            </button>
          </div>
        </div>
        {noResults ? (
          <h1>No results found.</h1>
        ) : (
          complaints.map((complaint) => (
            <div key={complaint._id} className="boxrviv">
              <div className="right_film_rate">
                <div className="profile-info">
                  <div>
                    <p className="username">{complaint.username}</p>
                    <p className="email">{complaint.email}</p>
                  </div>
                </div>
                <p className="comet">{complaint.complaint}</p>
                <div className="btn_set">
                  <button onClick={() => handleUpdate(complaint._id)} className="updtbtn_rate">
                    Update
                  </button>
                  <button onClick={() => handleDelete(complaint._id)} className="dltbtn_rate">
                    Delete
                  </button>
                </div>
                {updateData.id === complaint._id && (
                  <form onSubmit={handleSubmit} className="updt_form">
                    <textarea
                      name="complaint"
                      className="rate-text_updt"
                      value={updateData.complaint}
                      onChange={handleChange}
                      placeholder="Update Complaint"
                      required
                    />
                    <br />
                    <button type="submit" className="updtbtn_rate cen_brn_save">
                      Save
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ComplaintDetails;
