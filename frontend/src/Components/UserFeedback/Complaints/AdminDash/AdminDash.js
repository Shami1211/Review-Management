import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../Complaints/Rate.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
const URL = "http://localhost:8080/complaints";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
function AdminDash() {
  //fetch data
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setComplaints(data.complaints));
  }, []);
  /*PDF Function */
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: " Details Report",
    onafterprint: () => alert(" Details Report Successfully Download !"),
  });

  /*Search Function */
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filtered = data.complaints.filter((complaints) =>
        Object.values(complaints).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setComplaints(filtered);
      setNoResults(filtered.length === 0);
    });
  };

  return (
    <div className="fullbox">
      <div className="dash_button_set">
        <button className="add_rate" onClick={handlePrint}>
          Generate Report
        </button>
        <tr>
          <td className="">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              className="serch_inpt"
              placeholder="Search Here..."
            ></input>
          </td>

          <td>
            <button onClick={handleSearch} className="add_rate">
              Search
            </button>
          </td>
        </tr>
      </div>
      <div className="tbl_con_admin" ref={ComponentsRef}>
        <h1 className="rate_topic">
          Complaints<span className="sub_topic_inventory"> Details</span>{" "}
        </h1>
        <br></br>
        <table className="table_details_admin">
          <thead>
            <tr className="admin_tbl_tr">
              <th className="admin_tbl_th">User Name</th>
              <th className="admin_tbl_th">email</th>
              <th className="admin_tbl_th">complaint</th>
              <th className="admin_tbl_th">reply</th>
              <th className="admin_tbl_th">Action</th>
            </tr>
          </thead>
          {noResults ? (
            <div>
              <br></br>
              <h1 className="con_topic">
                No <span className="clo_us"> Found</span>{" "}
              </h1>
            </div>
          ) : (
            <tbody>
              {complaints.map((item, index) => (
                <tr className="admin_tbl_tr" key={index}>
                  <td className="admin_tbl_td">{item.username}</td>
                  <td className="admin_tbl_td gmil">{item.email}</td>
                  <td className="admin_tbl_td">{item.complaint}</td>
                  <td className="admin_tbl_td">
                    {" "}
                    {item.reply ? item.reply : "Not yet replied"}
                  </td>
                  <td className="admin_tbl_td">
                    {/* Pass item._id to deleteHandler */}
                    <Link to={`/reply/${item._id}`} className="update_rate">
                      Reply
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default AdminDash;
