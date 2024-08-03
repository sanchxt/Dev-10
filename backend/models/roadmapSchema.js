import mongoose from 'mongoose';

const stepSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String },
    resources: { type: [String] }, // Array of resource links
  },
  {
    timestamps: true,
  }
);

const roadmapSchema = mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required : true,
      ref: 'User'
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    steps: [stepSchema],
    duration: {
      type: String,
    },
    difficultyLevel: {
      type: String,
      lvl: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    visibility: {
      type: String,
      enum: ['Public', 'Private'],
      default: 'Public',
    },
    tags: {
      type: [String],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true, default: 0 },
      },
    ],
    averageRating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);


const Roadmap = mongoose.model('Roadmap', roadmapSchema);
export default Roadmap;