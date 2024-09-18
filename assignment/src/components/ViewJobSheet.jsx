import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from 'jspdf';

const ViewJobSheet = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://intern-task-asud.onrender.com/api/${id}`);
        setJobData(response.data);
      } catch (error) {
        setError("Error fetching job sheet: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobData();
  }, [id]);

  const handleSaveNote = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://intern-task-asud.onrender.com/api/${id}`, { note });
      console.log('Note saved:', note);
    } catch (error) {
      setError("Error saving note: " + error.message);
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    if (jobData) {
      doc.text('Job Sheet', 10, 10);
      doc.text(`Client Name: ${jobData.clientName}`, 10, 20);
      doc.text(`Contact Info: ${jobData.contactInfo}`, 10, 30);
      doc.text(`Received Date: ${jobData.receivedDate}`, 10, 40);
      doc.text(`Inventory Received: ${jobData.inventoryReceived}`, 10, 50);
      doc.text(`Inventory Image/Document/Video: ${jobData.inventoryImage}`, 10, 60);
      doc.text(`Reported Issues: ${jobData.reportedIssues}`, 10, 70);
      doc.text(`Client Notes: ${jobData.clientNotes}`, 10, 80);
      doc.text(`Assigned Technician: ${jobData.assignedTechnician}`, 10, 90);
      doc.text(`Estimated Amount: ${jobData.estimatedAmount}`, 10, 100);
      doc.text(`Deadline: ${jobData.deadline}`, 10, 110);
      doc.text(`Status: ${jobData.status}`, 10, 120);
      doc.save('JobSheet.pdf');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center mb-6 bg-blue-600 text-white py-2 rounded">VIEW JOB SHEET</h2>

      {jobData && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-600 text-white p-2">Client Name:</div>
            <div className="p-2">{jobData.clientName}</div>
            <div className="bg-blue-600 text-white p-2">Contact Info:</div>
            <div className="p-2">{jobData.contactInfo}</div>
            <div className="bg-blue-600 text-white p-2">Received Date:</div>
            <div className="p-2">{jobData.receivedDate}</div>
            <div className="bg-blue-600 text-white p-2">Inventory Received:</div>
            <div className="p-2">{jobData.inventoryReceived}</div>
            <div className="bg-blue-600 text-white p-2">Inventory Image/Document/Video:</div>
            <div className="p-2">{jobData.inventoryImage}</div>
            <div className="bg-blue-600 text-white p-2">Reported Issues:</div>
            <div className="p-2">{jobData.reportedIssues}</div>
            <div className="bg-blue-600 text-white p-2">Client Notes:</div>
            <div className="p-2">{jobData.clientNotes}</div>
            <div className="bg-blue-600 text-white p-2">Assigned Technician:</div>
            <div className="p-2">{jobData.assignedTechnician}</div>
            <div className="bg-blue-600 text-white p-2">Estimated Amount:</div>
            <div className="p-2">{jobData.estimatedAmount}</div>
            <div className="bg-blue-600 text-white p-2">Deadline:</div>
            <div className="p-2">{jobData.deadline}</div>
            <div className="bg-blue-600 text-white p-2">Status:</div>
            <div className="p-2">{jobData.status}</div>
          </div>

      
          <form onSubmit={handleSaveNote} className="mb-4">
            <label className="block text-sm font-medium mb-2">Add or Update Note:</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Save Note
            </button>
          </form>

          <div className="flex justify-between">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              onClick={() => navigate(`/edit/${id}`)}
            >
              Edit
            </button>
            <button
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
              onClick={async () => {
                try {
                  await axios.delete(`https://intern-task-asud.onrender.com/api/${id}`);
                  navigate('/');
                } catch (error) {
                  setError("Error deleting job sheet: " + error.message);
                }
              }}
            >
              Delete
            </button>
            <button
              className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
              onClick={() => navigate('/')}
            >
              Back
            </button>
          </div>

          
          <div className="mt-4">
            <button
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
              onClick={handleGeneratePDF}
            >
              Save as PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewJobSheet;
