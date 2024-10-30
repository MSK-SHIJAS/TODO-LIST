// routes/projectRoutes.js
import express from 'express';
import { createProject, getProjects, getProjectById, Adminregs, Login } from '../Controller/projectController.js';

const router = express.Router();

//ROUTE FOR BACKEND REGISTRATION AND LOGIN
router.post('/adminreg',Adminregs)
router.post('/login',Login)

router.post('/project', createProject);
router.get('/get', getProjects);
router.get('/project/:id', getProjectById);

export default router;
