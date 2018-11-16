import express from 'express';
import Project from '../models/Project';
import { filterMap } from '../utils';

const route = express.Router();

route.get('/', async (req, res) => {
	try {
		const projects = await Project.find()
			.populate('author')
			.populate({ path: 'posts', populate: { path: 'sponsors' } });
		res.status(200).json({ success: true, data: projects });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
});

route.get('/:id', async (req, res) => {
	try {
		const project = await Project.findOne({ _id: req.params.id });
		if (project) {
			res.status(200).json({ success: true, data: project });
		} else {
			throw new Error('Project Not Find');
		}
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
});

route.patch('/:id', async (req, res) => {
	try {
		const update = filterMap(req.body);
		const project = await Project.findOneAndUpdate({ _id: req.params.id }, { $set: update }, { new: true });
		res.status(400).json({ success: false, data: project });
	} catch (e) {
		res.status(400).json({ success: false, message: e.message });
	}
});

export default route;
