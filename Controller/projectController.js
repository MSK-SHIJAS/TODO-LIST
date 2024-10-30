// controllers/projectController.js

import Adminreg from "../Model/AdminReg.js";
import Project from "../Model/Project.js";

//I DID ADMIN REG FROM BACKEND
export const Adminregs = async (req, res) => {
  try {
    console.log(req.body);
    let newdata = new Adminreg({...req.body, userType: 'admin'});
    let response = await newdata.save();
    console.log(response);
    res.status(201).json({ message: 'Admin registered successfully', data: response });
  } catch (error) {
    res.status(500).json({ message: 'Error registering admin', error });
  }
};


//LOGIN
export const Login = async (req, res) => {
  try {
    let user = await Adminreg.findOne({ username: req.body.username, password: req.body.password });
    console.log(user);
    if (!user) {
      return res.status(401).json('Invalid username or password');
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};


export const createProject = async (req, res) => {
    const { title, description, deadline } = req.body;
    const project = new Project({ title, description, deadline });
    try {
      await project.save();
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Error creating project' });
    }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('todos');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('todos');
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
