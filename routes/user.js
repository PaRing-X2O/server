import express from 'express';
import User from '../models/User';
import { filterMap } from '../utils';

const route = express.Router();

route.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json({ success: true, data: users });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
});

route.get('/:id', async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (user) {
			res.status(200).json({ success: true, data: user });
		} else {
			throw new Error('User Not Found');
		}
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
});

route.patch('/:id', async (req, res) => {
	try {
		const update = filterMap(req.body);
		const user = await User.findOneAndUpdate({ _id: req.params.id }, { $set: update }, { new: true });
		res.status(400).json({ success: false, data: user });
	} catch (e) {
		res.status(400).json({ success: false, message: e.message });
	}
});

export default route;
