import express from 'express';
import Post from '../models/Post';
import multer from 'multer';
import Project from '../models/Project';

const route = express.Router();

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/images');
	},
	filename: function(req, file, cb) {
		const type = file.mimetype.split('/')[1];
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({ storage });

route.get('/', async (req, res) => {
	try {
		const posts = await Post.find().populate('sponsors');
		res.status(200).json({ success: true, data: posts });
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
});

route.get('/:id', async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id }).populate('sponsors');
		if (post) {
			res.status(200).json({ success: true, data: post });
		} else {
			throw new Error('Post Not Find');
		}
	} catch (err) {
		res.status(400).json({ success: false, message: err.message });
	}
});

const Upload = upload.fields([ { name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 30 } ]);
route.post('/', Upload, async (req, res) => {
	const { title, subtitle, desc, user } = req.body;
	const images = req.files['images'].map((image) => 'images/' + image.filename);
	console.log(images);
	const post = new Post({
		date: new Date(),
		title: subtitle,
		desc,
		images,
		thumbnail: 'images/' + req.files['thumbnail'][0].filename
	});
	await post.save();

	let project = await Project.findOne({ title });
	if (project) {
		project.posts.push(post._id);
	} else {
		project = new Project({
			title,
			author: user
		});
		project.posts.push(post._id);
		await project.save();
	}
	res.status(200).json({ success: true, data: project });
});

route.post('/sponsor', async (req, res) => {
	const { sponsor, post } = req.body;
	const _post = await Post.findOneAndUpdate({ _id: post }, { $push: { sponsors: sponsor } }, { new: true });
	res.status(200).json({ success: true, data: _post });
});

export default route;
