import React, {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegBookmark } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  useCreateRoadmapMutation,
  useGetRoadmapQuery,
  useGetRoadmapByIdQuery,
  useAddReviewMutation,
  useGetLatestCommentsQuery,
} from '../../slices/roadmapApiSlice';
import RoadmapSteps from './StepCards';
import image from '../../assets/roadmap.png';

const DisplayDetailedRoadmap: React.FC<any> = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetRoadmapByIdQuery(id);
  console.log(data);

  // Local state for reviews
  const [reviews, setReviews] = useState<any[]>(data?.ratings || []);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);

  // Submit handler for review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new review object
    const newReview = {
      username: data?.authorName, 
      rating,
      comment: review,
    };

    // Update the reviews state to include the new review
    setReviews((prevReviews) => [...prevReviews, newReview]);

    // Clear the form after submission
    setRating(0);
    setReview('');
  };

  // Reviews to display (3 or all based on state)
  const reviewsToDisplay = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <div className="container w-full py-7 px-7">
      {/* Title and Tags */}
      <div className="flex flex-wrap items-center gap-2 xl:gap-4 mb-4">
        <h1 className="text-lg md:text-xl lg:text-2xl font-medium md:font-bold max-w-2/3 whitespace-nowrap overflow-hidden text-ellipsis text-resource-box-primary theme-transition">
          {data?.title}
        </h1>
        <p className="text-[0.5rem] lg:text-[0.65rem] flex items-center justify-center tracking-wide bg-resource-box-by-bg font-medium px-1 md:px-2 md:py-2 rounded-3xl text-resource-box-by-text italic theme-transition">
          {data?.isOfficial ? 'Official' : 'Community'}
        </p>
        <ul className="flex flex-wrap gap-2 text-[0.58rem] sm:text-[0.67rem] md:text-[0.7rem] lg:text-xs">
          {data?.tags?.map((tag: string, idx: number) => (
            <li key={idx} className="bg-gray-300 rounded-2xl px-2 py-1">
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* Author Name */}
      <div className="text-right text-md italic">- By {data?.authorName}</div>

      {/* Image and Description Side by Side */}
      <div className="flex flex-col lg:flex-row items-start gap-8 mt-6">
        <div className="w-full lg:w-1/2">
          <img
            className="w-50 h-auto object-contain"
            src={image}
            alt="Roadmap"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-lg font-bold text-gray-900 mb-4">
            {data?.description}
          </h1>
        </div>
      </div>

      {/* Roadmap Steps */}
      <div className="flex justify-center flex-wrap gap-4 mt-8 max-w-4xl mx-auto">
        <RoadmapSteps />
      </div>

      {/* Ratings and Reviews Section */}
      <div className="mt-12 relative">
        <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
          Ratings & Reviews
          {/* View All Button */}
          {reviews.length > 3 && (
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="bg-violet-300 hover:underline"
            >
              {showAllReviews ? 'View Less' : 'View All'}
            </button>
          )}
        </h2>

        {/* Display Reviews */}
        {reviewsToDisplay.length > 0 ? (
          <div className="space-y-4">
            {reviewsToDisplay.map((review, idx) => (
              <div
                key={idx}
                className="border border-gray-300 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-2">
                  <span className="text-lg font-semibold">
                    {review.username}
                  </span>
                  <span className="ml-4 text-yellow-500">
                    {'★'.repeat(review.rating)} {'☆'.repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to leave a review!</p>
        )}

        {/* Add a Review */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                Rating:
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
              >
                <option value={0}>Select Rating</option>
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 && 's'}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                Review:
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
                rows={4}
                placeholder="Write your review here..."
              ></textarea>
            </div>
            <div className='flex justify-center gap-5'>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Review
              </button>
              <button
                type="reset"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear All
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DisplayDetailedRoadmap;
