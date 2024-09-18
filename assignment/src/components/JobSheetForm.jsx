import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobSheetForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '',
    contactInfo: '',
    receivedDate: '',
    inventoryReceived: '',
    fileUpload: null,
    reportedIssues: '',
    clientNotes: '',
    assignedTechnician: '',
    deadline: '',
    estimatedAmount: '',
    status: 'Pending'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, fileUpload: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('clientName', formData.clientName);
    formDataToSend.append('contactInfo', formData.contactInfo);
    formDataToSend.append('receivedDate', formData.receivedDate);
    formDataToSend.append('inventoryReceived', formData.inventoryReceived);
    
    if (formData.fileUpload) {
      formDataToSend.append('inventoryImage', formData.fileUpload);
    }
    
    formDataToSend.append('reportedIssues', formData.reportedIssues);
    formDataToSend.append('clientNotes', formData.clientNotes);
    formDataToSend.append('assignedTechnician', formData.assignedTechnician);
    formDataToSend.append('deadline', formData.deadline);
    formDataToSend.append('estimatedAmount', formData.estimatedAmount);
    formDataToSend.append('status', formData.status);
    
    try {
      await axios.post('https://intern-task-asud.onrender.com/api/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
     
      setFormData({
        clientName: '',
        contactInfo: '',
        receivedDate: '',
        inventoryReceived: '',
        fileUpload: null,
        reportedIssues: '',
        clientNotes: '',
        assignedTechnician: '',
        deadline: '',
        estimatedAmount: '',
        status: 'Pending'
      });
      
      navigate('/');
    } catch (error) {
      console.error('There was an error saving the job sheet!', error);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen p-5">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8 space-y-6">
        
        
        <h2 className="text-2xl font-semibold text-white bg-blue-700 py-2 text-center rounded-t-lg">
          CREATE NEW JOB SHEET
        </h2>

        
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Client Name:</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter client name"
            required
          />
        </div>

       
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Contact Info (Phone 10nos):</label>
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter contact number"
            required
          />
        </div>

        
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Received Date:</label>
          <input
            type="date"
            name="receivedDate"
            value={formData.receivedDate}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

       
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Inventory Received:</label>
          <input
            type="text"
            name="inventoryReceived"
            value={formData.inventoryReceived}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

       
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Upload Inventory Image/Document/Video:</label>
          <input
            type="file"
            name="fileUpload"
            onChange={handleFileChange}
            className="border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

       
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Reported Issues:</label>
          <textarea
            name="reportedIssues"
            value={formData.reportedIssues}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Describe issues"
          />
        </div>

        
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Client Notes:</label>
          <textarea
            name="clientNotes"
            value={formData.clientNotes}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Add client notes"
          />
        </div>

        
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Assigned Technician:</label>
          <input
            type="text"
            name="assignedTechnician"
            value={formData.assignedTechnician}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Estimated Amount:</label>
          <input
            type="number"
            name="estimatedAmount"
            value={formData.estimatedAmount}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

       
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition duration-300"
          >
            Save Job Sheet
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobSheetForm;
