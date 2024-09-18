import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditJobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '',
    contactInfo: '',
    receivedDate: '',
    inventoryReceived: '',
    inventoryImage: null,
    reportedIssues: '',
    clientNotes: '',
    assignedTechnician: '',
    estimatedAmount: '',
    deadline: '',
    status: 'In Progress'
  });

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/${jobId}`);
        console.log(response.data);
        
       
        const formattedReceivedDate = response.data.receivedDate.split('T')[0];
        const formattedDeadline = response.data.deadline.split('T')[0];
        
        
        setFormData({
          ...response.data,
          receivedDate: formattedReceivedDate,
          deadline: formattedDeadline,
        });
        
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobData();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      await axios.put(`/api/${jobId}`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/${jobId}`);
      navigate('/jobs'); 
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center mb-6 bg-blue-600 text-white py-2 rounded">EDIT JOB SHEET</h2>
      
      <form onSubmit={handleSubmit}>
       
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Client Name:</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Contact Info:</label>
          <input
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Received Date:</label>
          <input
            type="date"
            name="receivedDate"
            value={formData.receivedDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Inventory Received:</label>
          <input
            type="text"
            name="inventoryReceived"
            value={formData.inventoryReceived}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Inventory Image/Document/Video:</label>
          <input
            type="file"
            name="inventoryImage"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Reported Issues:</label>
          <textarea
            name="reportedIssues"
            value={formData.reportedIssues}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Client Notes:</label>
          <textarea
            name="clientNotes"
            value={formData.clientNotes}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            rows="4"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Assigned Technician:</label>
          <input
            type="text"
            name="assignedTechnician"
            value={formData.assignedTechnician}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Estimated Amount:</label>
          <input
            type="text"
            name="estimatedAmount"
            value={formData.estimatedAmount}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700"
          >
            Delete Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJobPage;
