// import mongoose from "mongoose";

// const ratingSchema = mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     rating: { type: Number, required: true },
//     comment: { type: String, default: "" },
//   },
//   {
//     timestamps: true,
//   }
// );

// // const resourceSchema = mongoose.Schema(
// //   {
// //     title: {
// //       type: String,
// //       required: true,
// //     },
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       required: true,
// //       ref: "User",
// //     },
// //     authorName: {
// //       type: String,
// //       default: "",
// //     },
// //     description: {
// //       type: String,
// //       required: true,
// //     },
// //     tags: {
// //       type: [String],
// //       required: true,
// //     },
// //     essentials: {
// //       type: [String],
// //       required: true,
// //     },
// //     extras: {
// //       type: [String],
// //       required: true,
// //     },
// //     notes: {
// //       type: String,
// //       default: "",
// //     },
// //     ratings: [ratingSchema],
// //     averageRating: {
// //       type: Number,
// //       default: 0,
// //     },
// //     ratingBreakdown: {
// //       type: Map,
// //       of: Number,
// //       default: {
// //         1: 0,
// //         2: 0,
// //         3: 0,
// //         4: 0,
// //         5: 0,
// //       },
// //     },
// //     favoritesCount: {
// //       type: Number,
// //       default: 0,
// //     },
// //     isOfficial: {
// //       type: Boolean,
// //       default: false,
// //     },
// //     reports: [
// //       {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: "ResourceReport",
// //       },
// //     ],
// //     totalViews: {
// //       type: Number,
// //       default: 0,
// //     },
// //     monthlyViews: {
// //       type: Number,
// //       default: 0,
// //     },
// //   },
// //   {
// //     timestamps: true,
// //   }
// // );


// const resourceSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       minlength: 3, // Min length according to Zod schema
//       maxlength: 40, // Max length according to Zod schema
//     },
//     language: {
//       type: String,
//       required: true,
//       minlength: 2, // Min length according to Zod schema
//       maxlength: 20, // Max length according to Zod schema
//     },
//     link: {
//       type: String,
//       required: true,
//       maxlength: 200, // Max length according to Zod schema
//     },
//     user: {
//       type: Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//     authorName: {
//       type: String,
//       default: "",
//     },
//     description: {
//       type: String,
//       required: true,
//       minlength: 4, // Min length according to Zod schema
//       maxlength: 150, // Max length according to Zod schema
//     },
//     tags: {
//       type: [String],
//       required: true,
//     },
//     essentials: {
//       type: [String],
//       required: true,
//     },
//     extras: {
//       type: [String],
//       required: true,
//     },
//     notes: {
//       type: String,
//       default: "",
//     },
//     ratings: [ratingSchema],
//     averageRating: {
//       type: Number,
//       default: 0,
//     },
//     ratingBreakdown: {
//       type: Map,
//       of: Number,
//       default: {
//         1: 0,
//         2: 0,
//         3: 0,
//         4: 0,
//         5: 0,
//       },
//     },
//     favoritesCount: {
//       type: Number,
//       default: 0,
//     },
//     isOfficial: {
//       type: Boolean,
//       default: false,
//     },
//     reports: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "ResourceReport",
//       },
//     ],
//     totalViews: {
//       type: Number,
//       default: 0,
//     },
//     monthlyViews: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Resource = mongoose.model("Resource", resourceSchema);

// module.exports = Resource;


import mongoose from "mongoose";

const { Schema } = mongoose;

const ratingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, required: true },
  comment: { type: String, default: "" },
}, {
  timestamps: true,
});

const resourceSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40,
  },
  language: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  link: {
    type: String,
    required: true,
    maxlength: 200,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  authorName: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 150,
  },
  tags: {
    type: [String],
    required: true,
  },
  essentials: {
    type: [String],
    required: true,
  },
  extras: {
    type: [String],
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
  ratings: [ratingSchema],
  averageRating: {
    type: Number,
    default: 0,
  },
  ratingBreakdown: {
    type: Map,
    of: Number,
    default: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
  },
  favoritesCount: {
    type: Number,
    default: 0,
  },
  isOfficial: {
    type: Boolean,
    default: false,
  },
  reports: [
    {
      type: Schema.Types.ObjectId,
      ref: "ResourceReport",
    },
  ],
  totalViews: {
    type: Number,
    default: 0,
  },
  monthlyViews: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
