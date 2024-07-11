import asyncHandler from "express-async-handler";

// desc     auth user / set token
// route    POST /users/auth
// access   PUBLIC
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "auth user" });
});

export { authUser };
