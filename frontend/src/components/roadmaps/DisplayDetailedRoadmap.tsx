import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import image from '../../assets/roadmap.png';
import RoadmapSteps from './StepCards';
import { useGetRoadmapByIdQuery } from '../../slices/roadmapApiSlice';

const DisplayDetailedRoadmap: React.FC<any> = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetRoadmapByIdQuery(id);
  console.log(data);

  const [reviews, setReviews] = useState<any[]>(data?.ratings || []);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReview = {
      username: data?.authorName,
      rating,
      comment: review,
    };

    setReviews((prevReviews) => [...prevReviews, newReview]);
    setRating(0);
    setReview('');
  };

  const reviewsToDisplay = showAllReviews ? reviews : reviews.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col py-7 px-4 sm:px-6 md:px-8 lg:px-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-4">
        <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4">
          <h1 className="text-lg md:text-xl lg:text-2xl font-medium md:font-bold max-w-full md:max-w-2/3 whitespace-nowrap overflow-hidden text-ellipsis text-resource-box-primary theme-transition">
            {data?.title}
          </h1>
          <p className="text-[0.5rem] lg:text-[0.65rem] flex items-center justify-center tracking-wide bg-resource-box-by-bg font-medium px-1 md:px-2 md:py-2 rounded-3xl text-resource-box-by-text italic theme-transition">
            {data?.isOfficial ? 'Official' : 'Community'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[0.58rem] sm:text-[0.67rem] md:text-[0.7rem] lg:text-xs mt-2 md:mt-0">
          {data?.tags?.map((tag: string, idx: number) => (
            <li
              key={idx}
              className="bg-gray-300 rounded-2xl px-2 py-1 list-none"
            >
              {tag}
            </li>
          ))}
        </div>
      </div>

      <div className="text-right text-md italic mb-6">
        - By {data?.authorName}
      </div>

      {/* Image and Description */}
      <div className="">
        {/* Card Container */}
        <div className="">
          <div className="">
            {/* Image */}
            <div className="">
              <img
                className=""
                src={image}
                alt="Roadmap"
              />
            </div>
            {/* Description */}
            <div className="w-full md:w-1/2 p-4 md:pl-8">
              <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                {data?.description}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Steps */}
      <div className="flex justify-center flex-wrap gap-4 mb-8 max-w-4xl mx-auto">
        <RoadmapSteps />
      </div>

      {/* Ratings & Reviews */}
      <div className="flex flex-col mt-12 relative">
        <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
          Ratings & Reviews
          {reviews.length > 3 && (
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="text-md hover:underline"
            >
              {showAllReviews ? 'View Less' : 'View All'}
            </button>
          )}
        </h2>

        {reviewsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

        {/* Leave a Review Form */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700"></label>
              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer ${
                      rating >= star ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    <FaStar size={24} />
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700"></label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
                rows={4}
                placeholder="Write your review here..."
              ></textarea>
            </div>
            <div className="flex justify-center gap-5">
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
