import express from 'express'
import multer from "multer";
import JobSheet from "../models/JobSheet.js"
const router = express.Router()


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });




router.post('/', upload.single('inventoryImage'), async (req, res) => {
  try {
    const newJobSheet = new JobSheet({
      clientName: req.body.clientName,
      contactInfo: req.body.contactInfo,
      receivedDate: req.body.receivedDate,
      inventoryReceived: req.body.inventoryReceived,
      inventoryImage: req.file ? req.file.path : undefined, 
      reportedIssues: req.body.reportedIssues,
      clientNotes: req.body.clientNotes,
      assignedTechnician: req.body.assignedTechnician,
      estimatedAmount: req.body.estimatedAmount,
      deadline: req.body.deadline,
      status: req.body.status || 'In Progress'
    });

    const savedJobSheet = await newJobSheet.save();
    res.status(201).json(savedJobSheet); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const job = await JobSheet.find()
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:jobId', async (req, res) => {
  try {
    const job = await JobSheet.findById(req.params.jobId);
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/:jobId', upload.single('inventoryImage'), async (req, res) => {
  try {
    const updateData = {
      clientName: req.body.clientName,
      contactInfo: req.body.contactInfo,
      receivedDate: req.body.receivedDate,
      inventoryReceived: req.body.inventoryReceived,
      inventoryImage: req.file ? req.file.path : undefined,
      reportedIssues: req.body.reportedIssues,
      clientNotes: req.body.clientNotes,
      assignedTechnician: req.body.assignedTechnician,
      estimatedAmount: req.body.estimatedAmount,
      deadline: req.body.deadline,
      status: req.body.status
    };

  
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const job = await JobSheet.findByIdAndUpdate(req.params.jobId, updateData, { new: true });
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete('/:jobId', async (req, res) => {
  try {
    const job = await JobSheet.findByIdAndDelete(req.params.jobId);
    if (job) {
      res.json({ message: 'Job sheet deleted successfully' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.use('/uploads', express.static('uploads'));

export default router;
