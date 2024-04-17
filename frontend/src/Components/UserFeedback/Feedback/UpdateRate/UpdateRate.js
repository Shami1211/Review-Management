import React, { useEffect, useState } from "react";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

function UpdateRate() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/rates/${id}`);
        const rateData = response.data.rate;
        setInputs({
          username: rateData.username,
          email: rateData.email,
          rates: parseFloat(rateData.rates), // Convert rate to float
          comment: rateData.comment,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:8080/rates/${id}`, {
        username: String(inputs.username),
        email: String(inputs.email),
        rates: String(inputs.rates),
        comment: String(inputs.comment),
      });
      window.alert("Update successfully!");
      history("/");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "rates" ? parseFloat(value) : value;

    setInputs((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest();
  };

  // Custom Rating component to render star icons based on the rate value
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          style={{ color: i <= inputs.rates ? "#ffc107" : "#e4e5e9", cursor: "pointer" }}
          onClick={() => handleRateClick(i)}
        />
      );
    }
    return stars;
  };

  const handleRateClick = (rateValue) => {
    setInputs((prevState) => ({
      ...prevState,
      rates: rateValue,
    }));
  };

  return (
    <div>
      <div className="rate-full-box">
        <div>
          <h1 className="rate_topic">
            Update <span className="rate-us">Rate</span>
          </h1>
          <form onSubmit={handleSubmit} className="rate-full-box-form">
            <label className="rate-full-box-label">Username</label>
            <input
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              className="rate-full-box-input"
              required
            />
            <br />
            <label className="rate-full-box-label">Email</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              className="rate-full-box-input"
              required
            />
            <br />
            <label className="rate-full-box-label">Rating</label>
            <br />
            {renderStars()}
            <br />
            <label className="rate-full-box-label">Comment</label>
            <textarea
              className="rate-full-box-input rate-text"
              name="comment"
              value={inputs.comment}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit" className="centerbtn_rate">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateRate;
