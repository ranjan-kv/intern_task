import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import EditJobPage from './components/EditJobPage';
import JobSheetForm from './components/JobSheetForm';
import ViewJobSheet from './components/ViewJobSheet'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<JobSheetForm />} />
        <Route path="/view/:id" element={<ViewJobSheet />} />
        <Route path="/edit/:jobId" element={<EditJobPage />} />
      </Routes>
    </Router>
  );
};

export default App;
