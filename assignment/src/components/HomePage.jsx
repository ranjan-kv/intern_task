import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobSheets, setJobSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobSheets = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api");
        setJobSheets(response.data);
      } catch (error) {
        setError("Error fetching job sheets: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobSheets();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/api/${jobId}`);
      setJobSheets(jobSheets.filter(job => job._id !== jobId));
    } catch (error) {
      setError("Error deleting job sheet: " + error.message);
    }
  };

  const handleSearch = async () => {
    try {
      const filtered = jobSheets.filter((jobsheet) =>
        jobsheet.clientName.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
      setJobSheets(filtered);
    } catch (error) {
      setError("Error searching job sheets: " + error.message);
    }
  };
  

  return (
    <div className="container mx-auto px-3 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold bg-blue-600 text-white py-3 rounded-lg shadow-md">
          HARDIK TRADERS - CLIENT MANAGEMENT DASHBOARD
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Client Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 md:mb-0 w-full md:w-2/3"
        />
        <div className="flex">
          <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-2 shadow-md">Search</button>
          <button onClick={() => navigate('/new')} className="bg-green-600 text-white px-4 py-2 rounded-lg ml-2 shadow-md">New Job Sheet</button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 px-2 py-2">#</th>
              <th className="border border-gray-300 px-2 py-2">Client Id</th>
              <th className="border border-gray-300 px-2 py-2">Client Name</th>
              <th className="border border-gray-300 px-2 py-2">Contact Info</th>
              <th className="border border-gray-300 px-2 py-2">Received Date</th>
              <th className="border border-gray-300 px-2 py-2">Inventory Received</th>
              <th className="border border-gray-300 px-2 py-2">Reported Issues</th>
              <th className="border border-gray-300 px-2 py-2">Client Notes</th>
              <th className="border border-gray-300 px-2 py-2">Assigned Technician</th>
              <th className="border border-gray-300 px-2 py-2">Estimated Amount</th>
              <th className="border border-gray-300 px-2 py-2">Deadline</th>
              <th className="border border-gray-300 px-2 py-2">Status</th>
              <th className="border border-gray-300 px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobSheets.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-2 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-2 py-2">{item._id}</td>
                <td className="border border-gray-300 px-2 py-2">{item.clientName}</td>
                <td className="border border-gray-300 px-2 py-2">{item.contactInfo}</td>
                <td className="border border-gray-300 px-2 py-2">{item.receivedDate}</td>
                <td className="border border-gray-300 px-2 py-2">{item.inventoryReceived}</td>
                <td className="border border-gray-300 px-2 py-2">{item.reportedIssues}</td>
                <td className="border border-gray-300 px-2 py-2">{item.clientNotes}</td>
                <td className="border border-gray-300 px-2 py-2">{item.assignedTechnician}</td>
                <td className="border border-gray-300 px-2 py-2">{item.estimatedAmount}</td>
                <td className="border border-gray-300 px-2 py-2">{item.deadline}</td>
                <td className="border border-gray-300 px-2 py-2">{item.status}</td>
                <td className="border border-gray-300 px-2 py-2 text-center">
                  <button onClick={() => navigate(`/view/${item._id}`)} className="bg-green-500 text-white px-3 py-1 rounded-lg shadow-md">View</button>
                  <button onClick={() => navigate(`/edit/${item._id}`)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md ml-2">Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;