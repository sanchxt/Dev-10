const validateResourceFields = (
  title,
  description,
  tags,
  essentials,
  extras
) => {
  if (!title || !description || !tags || !essentials || !extras) {
    throw new Error("Please include all required fields");
  }

  if (!Array.isArray(tags) || !tags.length) {
    throw new Error("Tags must be a non-empty array");
  }

  if (!Array.isArray(essentials) || !essentials.length) {
    throw new Error("Essentials must be a non-empty array");
  }

  if (!Array.isArray(extras) || !extras.length) {
    throw new Error("Extras must be a non-empty array");
  }
};

export default validateResourceFields;
