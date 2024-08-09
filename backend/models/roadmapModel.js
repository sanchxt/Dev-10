import mongoose from "mongoose";

const stepSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    resources: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const ratingSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true },
    comment: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const roadmapSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    authorName: { type: String, default: "" },
    tags: { type: [String], required: true },
    steps: { type: [stepSchema], required: true },
    likes: { type: Number, default: 0 },
    ratings: [ratingSchema],
    averageRating: { type: Number, default: 0 },
    ratingBreakdown: {
      type: Map,
      of: Number,
      default: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    },
    favoritesCount: { type: Number, default: 0 },
    isOfficial: { type: Boolean, default: false },
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "RoadmapReport" }],
    totalViews: { type: Number, default: 0 },
    monthlyViews: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// const stepSchema = mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     duration: { type: String },
//     resources: { type: [String] },
//   },
//   {
//     timestamps: true,
//   }
// );

// const roadmapSchema = mongoose.Schema(
//   {
//     id: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     steps: [stepSchema],
//     duration: {
//       type: String,
//     },
//     difficultyLevel: {
//       type: String,
//       enum: ["beginner", "intermediate", "advanced"],
//       default: "beginner",
//     },
//     tags: {
//       type: [String],
//       required: true,
//     },
//     likes: {
//       type: Number,
//       default: 0,
//     },
//     comments: [
//       {
//         user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//         comment: { type: String, required: true },
//         createdAt: { type: Date, default: Date.now },
//       },
//     ],
//     ratings: [
//       {
//         user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//         rating: { type: Number, required: true, default: 0 },
//       },
//     ],
//     averageRating: { type: Number, default: 0 },
//   },
//   {
//     timestamps: true,
//   }
// );

const Roadmap = mongoose.model("Roadmap", roadmapSchema);
export default Roadmap;
