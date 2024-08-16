import React, { useState } from 'react';
import { useGetRoadmapByIdQuery } from '../../slices/roadmapApiSlice';
import { useParams } from 'react-router-dom';

const RoadmapSteps: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const { id } = useParams<{ id: string }>();
  const { data } = useGetRoadmapByIdQuery(id);

  const handleClick = (stepId: number) => {
    setActiveStep(activeStep === stepId ? null : stepId);
  };

  return (
    <div className="w-full px-4 overflow-hidden sm:px-6 md:px-8 py-8">
      {/* Step Cards Container */}
      <div className="relative">
        <div className="overflow-x-auto pb-4 scrollbar-thin">
          <div className="flex gap-4 min-w-full mobile-scroll">
            {data?.steps.map((step, index) => (
              <div key={index} className="flex-shrink-0 w-64 mx-2">
                {/* Step Card */}
                <div
                  onClick={() => handleClick(index)}
                  className={`flex items-center justify-center bg-violet-900 gap-2 text-white w-full h-32 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${
                    activeStep === index ? 'bg-violet-700' : ''
                  }`}
                >
                  <span className="text-3xl font-bold">{index + 1}</span>
                </div>

                {/* Description and Links */}
                {activeStep === index && (
                  <div className="mt-4 p-4 bg-white border border-gray-300 shadow-lg rounded-lg transition-all">
                    <h3 className="text-lg md:text-xl font-semibold text-violet-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 mb-3">{step.description}</p>
                    {step.resources && step.resources.length > 0 && (
                      <div>
                        <h4 className="text-md font-semibold mb-2">
                          Resources:
                        </h4>
                        <ul className="list-disc pl-5 space-y-2">
                          {step.resources.map(
                            (resource: string, index: number) => (
                              <li key={index}>
                                <a
                                  href={resource}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:underline"
                                >
                                  {resource}
                                </a>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .mobile-scroll {
            display: flex;
            flex-direction: row;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
};

export default RoadmapSteps;
