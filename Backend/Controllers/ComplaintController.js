const Complaint = require("../Model/ComplaintModel");

const getAllComplaints = async (req, res, next) => {
  let complaints;
  try {
    complaints = await Complaint.find();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  
  if (!complaints || complaints.length === 0) {
    return res.status(404).json({ message: "Complaints not found" });
  }
  
  return res.status(200).json({ complaints });
};

const addComplaint = async (req, res, next) => {
  const { username, email, complaint } = req.body;

  // Check if complaint field is provided
  if (!complaint) {
    return res.status(400).json({ message: "Complaint field is required" });
  }

  let newComplaint;

  try {
    newComplaint = new Complaint({ username, email, complaint });
    await newComplaint.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return res.status(201).json({ newComplaint });
};

const getComplaintById = async (req, res, next) => {
  const id = req.params.id;
  let complaint;

  try {
    complaint = await Complaint.findById(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  return res.status(200).json({ complaint });
};

const updateComplaint = async (req, res, next) => {
  const id = req.params.id;
  const { username, email, complaint } = req.body;
  let updatedComplaint;

  try {
    updatedComplaint = await Complaint.findByIdAndUpdate(id, {
      username,
      email,
      complaint
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!updatedComplaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  return res.status(200).json({ updatedComplaint });
};

const deleteComplaint = async (req, res, next) => {
  const id = req.params.id;
  let complaint;

  try {
    complaint = await Complaint.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  if (!complaint) {
    return res.status(404).json({ message: "Complaint not found" });
  }

  return res.status(200).json({ complaint });
};

exports.getAllComplaints = getAllComplaints;
exports.addComplaint = addComplaint;
exports.getComplaintById = getComplaintById;
exports.updateComplaint = updateComplaint;
exports.deleteComplaint = deleteComplaint;
