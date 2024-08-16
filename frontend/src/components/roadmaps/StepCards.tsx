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

  // Number of cards visible at a time
  const visibleCards = 3;

  return (
    <div className="w-full px-6 py-8">
      {/* Step Cards Container */}
      <div className="flex overflow-x-auto pb-4">
        <div
          className="flex w-full"
          style={{ width: `calc(100% * ${data?.steps.length / visibleCards})` }}
        >
          {data?.steps.map((step, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{ width: `calc(100% / ${visibleCards})` }}
            >
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
                <div className="mt-4 p-6 bg-white border border-gray-300 shadow-lg  rounded-lg transition-all">
                  <h3 className="text-xl font-semibold text-violet-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{step.description}</p>
                  {step.resources && step.resources.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Resources:</h4>
                      <ul className="list-disc pl-6 space-y-2">
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
  );
};

export default RoadmapSteps;
