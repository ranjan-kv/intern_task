import mongoose from "mongoose";

const jobSheetSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  contactInfo: { type: String },
  receivedDate: { type: Date },
  inventoryReceived: { type: String },
  inventoryImage: { type: String },
  reportedIssues: { type: String },
  clientNotes: { type: String },
  assignedTechnician: { type: String },
  estimatedAmount: { type: Number },
  deadline: { type: Date },
  status: { type: String, default: 'In Progress' }
});

const JobSheet = mongoose.model('JobSheet', jobSheetSchema);

export default JobSheet