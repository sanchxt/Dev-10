import asyncHandler from 'express-async-handler';
import Roadmap from '../models/roadmapSchema.js';
import User from '../models/userModel.js';

// desc     create new roadmap
// route    POST /api/roadmaps
// access   private
const createRoadmap = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    steps,
    duration,
    category,
    difficultyLevel,
    tags,
    visibility,
  } = req.body;

  const roadmap = new Roadmap({
    title,
    id: req.user._id,
    description,
    steps,
    duration,
    category,
    difficultyLevel,
    createdBy: req.user._id,
    tags,
    visibility,
  });

  const createdRoadmap = await roadmap.save();
  res.status(201).json(createdRoadmap);
});

// desc     Get all roadmaps
// route    GET /api/roadmaps
// access   PUBLIC
const getAllRoadmaps = asyncHandler(async (req, res) => {
  const roadmaps = await Roadmap.find({});
  res.json(roadmaps);
});

// desc     Get single roadmap
// route    GET /api/roadmaps/:id
// access   PUBLIC
const getRoadmapById = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.findById(req.params.id);

  if (roadmap) {
    res.json(roadmap);
  } else {
    res.status(404);
    throw new Error('Roadmap not found');
  }
});

// desc     Update roadmap
// route    PUT /api/roadmaps/:id
// access   PRIVATE
const updateRoadmap = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.findById(req.params.id);

  if (roadmap) {
    if (roadmap.id.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized');
    }

    roadmap.title = req.body.title || roadmap.title;
    roadmap.description = req.body.description || roadmap.description;
    roadmap.steps = req.body.steps || roadmap.steps;
    roadmap.duration = req.body.duration || roadmap.duration;
    roadmap.category = req.body.category || roadmap.category;
    roadmap.difficultyLevel =
      req.body.difficultyLevel || roadmap.difficultyLevel;
    roadmap.tags = req.body.tags || roadmap.tags;
    roadmap.visibility = req.body.visibility || roadmap.visibility;

    const updatedRoadmap = await roadmap.save();
    res.json(updatedRoadmap);
  } else {
    res.status(404);
    throw new Error('Roadmap not found');
  }
});

// desc     Delete roadmap
// route    DELETE /api/roadmaps/:id
// access   PRIVATE
const deleteRoadmap = asyncHandler(async (req, res) => {
  const roadmap = await Roadmap.findById(req.params.id);

  if (roadmap) {
    if (roadmap.id.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await roadmap.deleteOne({ _id: req.params.id });
    res.json({ message: 'Roadmap removed' });
  } else {
    res.status(404);
    throw new Error('Roadmap not found');
  }
});

//desc   rating roadmap
//route   POST/api/roadmaps/:id/rate
//access private

const rateRoadmap = asyncHandler(async (req, res) => {
  const { rating } = req.body;
  const roadmap = await Roadmap.findById(req.params.id);
  const user = await User.findById(req.user._id);

  if (roadmap) {
    const alreadyRated = user.ratedRoadmaps.find(
      (r) => r.roadmap.toString() === roadmap._id.toString()
    );

    if (alreadyRated) {
      res.status(400);
      throw new Error('You have already rated this roadmap');
    }

    const newRating = {
      user: req.user._id,
      rating,
    };

    roadmap.ratings.push(newRating);
    roadmap.numRatings = roadmap.ratings.length;
    roadmap.averageRating =
      roadmap.ratings.reduce((acc, item) => item.rating + acc, 0) /
      roadmap.ratings.length;

    await roadmap.save();

    user.ratedRoadmaps.push({ roadmap: roadmap._id, rating }); // Ensure rating is added
    await user.save();

    res.status(201).json({ message: 'Roadmap rated' });
  } else {
    res.status(404);
    throw new Error('Roadmap not found');
  }
});

export {
  createRoadmap,
  getAllRoadmaps,
  getRoadmapById,
  updateRoadmap,
  deleteRoadmap,
  rateRoadmap,
};
