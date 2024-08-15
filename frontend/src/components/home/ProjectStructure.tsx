import React, { useState } from "react";
import Sidebar from "../shared/Sidebar";

const ProjectStructure: React.FC = () => {
  const [selectedType, setSelectedType] = useState("All Types");

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const projects = [
    {
      id: 1,
      type: "Web Dev",
      title: "Responsive Website",
      description: "A responsive website using HTML, CSS, and JavaScript.",
      url: "https://example.com/responsive-website",
    },
    {
      id: 2,
      type: "Web Dev",
      title: "E-commerce Site",
      description: "A full-featured e-commerce site using React and Node.js.",
      url: "https://example.com/e-commerce-site",
    },
    {
      id: 3,
      type: "Web Dev",
      title: "Portfolio Website",
      description:
        "A personal portfolio website showcasing projects and skills.",
      url: "https://example.com/portfolio-website",
    },
    {
      id: 4,
      type: "Web Dev",
      title: "Blog Platform",
      description:
        "A blog platform with user authentication and content management.",
      url: "https://example.com/blog-platform",
    },
    {
      id: 5,
      type: "Web Dev",
      title: "Social Media App",
      description:
        "A social media platform for sharing posts and connecting with friends.",
      url: "https://example.com/social-media-app",
    },
    {
      id: 6,
      type: "Web Dev",
      title: "Task Manager",
      description: "A task management app to organize and prioritize tasks.",
      url: "https://example.com/task-manager",
    },
    {
      id: 7,
      type: "Web Dev",
      title: "Online Forum",
      description: "A forum platform for discussions and community engagement.",
      url: "https://example.com/online-forum",
    },
    {
      id: 8,
      type: "Web Dev",
      title: "Job Portal",
      description: "A job portal for employers and job seekers.",
      url: "https://example.com/job-portal",
    },
    {
      id: 9,
      type: "Web Dev",
      title: "Recipe Website",
      description: "A recipe website with user-generated content and reviews.",
      url: "https://example.com/recipe-website",
    },
    {
      id: 10,
      type: "Web Dev",
      title: "Online Learning Platform",
      description: "An online platform for courses and learning resources.",
      url: "https://example.com/online-learning-platform",
    },
    {
      id: 11,
      type: "Game Dev",
      title: "2D Platformer",
      description: "A fun 2D platformer game built with Unity.",
      url: "https://example.com/2d-platformer",
    },
    {
      id: 12,
      type: "Game Dev",
      title: "Puzzle Game",
      description: "A challenging puzzle game with multiple levels.",
      url: "https://example.com/puzzle-game",
    },
    {
      id: 13,
      type: "Game Dev",
      title: "Endless Runner",
      description: "An endless runner game with procedurally generated levels.",
      url: "https://example.com/endless-runner",
    },
    {
      id: 14,
      type: "Game Dev",
      title: "Tower Defense",
      description: "A tower defense game with strategic gameplay.",
      url: "https://example.com/tower-defense",
    },
    {
      id: 15,
      type: "Game Dev",
      title: "RPG Game",
      description: "A role-playing game with character progression and quests.",
      url: "https://example.com/rpg-game",
    },
    {
      id: 16,
      type: "Game Dev",
      title: "Card Game",
      description: "A digital card game with multiplayer support.",
      url: "https://example.com/card-game",
    },
    {
      id: 17,
      type: "Game Dev",
      title: "Platform Fighter",
      description:
        "A platform fighting game with various characters and moves.",
      url: "https://example.com/platform-fighter",
    },
    {
      id: 18,
      type: "Game Dev",
      title: "Survival Game",
      description:
        "A survival game where players must manage resources and survive.",
      url: "https://example.com/survival-game",
    },
    {
      id: 19,
      type: "Game Dev",
      title: "Racing Game",
      description: "A racing game with various tracks and vehicles.",
      url: "https://example.com/racing-game",
    },
    {
      id: 20,
      type: "Game Dev",
      title: "Space Shooter",
      description: "A space shooter game with fast-paced action.",
      url: "https://example.com/space-shooter",
    },
    {
      id: 21,
      type: "Android Dev",
      title: "Weather App",
      description: "An Android app to display weather information.",
      url: "https://www.youtube.com/watch?v=DWZPu0kW2Nk&list=PLgadKTyFdWuhSyMbTAYGV10KK0rU364t4",
    },
    {
      id: 22,
      type: "Android Dev",
      title: "Fitness Tracker",
      description: "An app to track fitness activities and goals.",
      url: "https://example.com/fitness-tracker",
    },
    {
      id: 23,
      type: "Android Dev",
      title: "Expense Manager",
      description: "An app to manage personal finances and track expenses.",
      url: "https://example.com/expense-manager",
    },
    {
      id: 24,
      type: "Android Dev",
      title: "Notes App",
      description: "A simple notes app with cloud sync.",
      url: "https://example.com/notes-app",
    },
    {
      id: 25,
      type: "Android Dev",
      title: "Language Learning App",
      description: "An app to learn new languages with interactive lessons.",
      url: "https://example.com/language-learning-app",
    },
    {
      id: 26,
      type: "Android Dev",
      title: "Music Player",
      description: "A music player app with playlists and offline support.",
      url: "https://example.com/music-player",
    },
    {
      id: 27,
      type: "Android Dev",
      title: "Meditation App",
      description: "An app for guided meditations and relaxation techniques.",
      url: "https://example.com/meditation-app",
    },
    {
      id: 28,
      type: "Android Dev",
      title: "Recipe App",
      description:
        "An app to find and save recipes with a shopping list feature.",
      url: "https://example.com/recipe-app",
    },
    {
      id: 29,
      type: "Android Dev",
      title: "Travel Planner",
      description: "An app to plan trips and manage travel itineraries.",
      url: "https://example.com/travel-planner",
    },
    {
      id: 30,
      type: "Android Dev",
      title: "Habit Tracker",
      description: "An app to build and track daily habits.",
      url: "https://example.com/habit-tracker",
    },
  ];
  const filteredProjects =
    selectedType === "All Types"
      ? projects
      : projects.filter((project) => project.type === selectedType);

  return (
    <>
      <section className="flex flex-col md:flex-row h-full min-h-screen bg-resources-pg-bg theme-transition">
        <Sidebar />
        <div className="flex flex-col items-center w-full pt-1 md:pt-6 ml-1 md:ml-12">
          <div className="py-2 md:py-3 px-4 w-full flex justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-purple-700 text-center">
              Explore Amazing Projects Here
            </h1>
          </div>
          <div className="py-2 px-4 w-full flex flex-col justify-center items-center shadow-md mt-2">
            <label
              className="block w-full text-lg md:text-xl lg:text-2xl font-semibold text-black text-center mb-2"
              htmlFor="projectType"
            >
              Choose Project Type:
            </label>
            <div className="w-full flex flex-wrap justify-center space-x-0 space-y-2 sm:space-x-4 sm:space-y-0">
              <button
                onClick={() => handleTypeChange("All Types")}
                className={`appearance-none w-auto bg-white border border-purple-300 text-black text-sm sm:text-base md:text-lg lg:text-xl rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  selectedType === "All Types" ? "bg-purple-100" : ""
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleTypeChange("Game Dev")}
                className={`appearance-none w-auto bg-white border border-purple-300 text-black text-sm sm:text-base md:text-lg lg:text-xl rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  selectedType === "Game Dev" ? "bg-purple-100" : ""
                }`}
              >
                Game Dev
              </button>
              <button
                onClick={() => handleTypeChange("Web Dev")}
                className={`appearance-none w-auto bg-white border border-purple-300 text-black text-sm sm:text-base md:text-lg lg:text-xl rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  selectedType === "Web Dev" ? "bg-purple-100" : ""
                }`}
              >
                Web Dev
              </button>
              <button
                onClick={() => handleTypeChange("Android Dev")}
                className={`appearance-none w-auto bg-white border border-purple-300 text-black text-sm sm:text-base md:text-lg lg:text-xl rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  selectedType === "Android Dev" ? "bg-purple-100" : ""
                }`}
              >
                Android Dev
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full mt-4">
            {filteredProjects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-purple-300 rounded-lg p-4 shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                <h2 className="text-xl font-bold text-purple-700">
                  {project.title}
                </h2>
                <p className="text-gray-700">{project.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectStructure;
