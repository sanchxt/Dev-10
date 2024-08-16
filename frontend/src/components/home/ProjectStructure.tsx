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
      url: "https://www.youtube.com/watch?v=wzpx_d_nHfg",
    },
    {
      id: 2,
      type: "Web Dev",
      title: "E-commerce Site",
      description: "A full-featured e-commerce site using React and Node.js.",
      url: "https://github.com/basir/node-react-ecommerce",
    },
    {
      id: 3,
      type: "Web Dev",
      title: "Portfolio Website",
      description:
        "A personal portfolio website showcasing projects and skills.",
      url: "https://codewithcurious.com/projects/personal-portfolio-website/",
    },
    {
      id: 4,
      type: "Web Dev",
      title: "Blog Platform",
      description:
        "A blog platform with user authentication and content management.",
      url: "https://www.domainindia.com/login/knowledgebase/538/Designing-a-Personal-Blog-Platform-with-MERN-Stack.html",
    },
    {
      id: 5,
      type: "Web Dev",
      title: "Social Media App",
      description:
        "A social media platform for sharing posts and connecting with friends.",
      url: "https://github.com/Deshan555/Social-Media-Platform",
    },
    {
      id: 6,
      type: "Web Dev",
      title: "Task Manager",
      description: "A task management app to organize and prioritize tasks.",
      url: "https://github.com/topics/task-management-app?o=desc&s=stars",
    },
    {
      id: 7,
      type: "Web Dev",
      title: "Online Forum",
      description: "A forum platform for discussions and community engagement.",
      url: "https://github.com/mbeps/next_discussion_platform",
    },
    {
      id: 8,
      type: "Web Dev",
      title: "Job Portal",
      description: "A job portal for employers and job seekers.",
      url: "https://www.youtube.com/watch?v=zwpzwZIkF4Q",
    },
    {
      id: 9,
      type: "Web Dev",
      title: "Recipe Website",
      description: "A recipe website with user-generated content and reviews.",
      url: "https://www.isitwp.com/create-food-recipe-website/",
    },
    {
      id: 10,
      type: "Web Dev",
      title: "Online Learning Platform",
      description: "An online platform for courses and learning resources.",
      url: "https://github.com/topics/learning-management-system",
    },
    {
      id: 11,
      type: "Game Dev",
      title: "2D Platformer",
      description: "A fun 2D platformer game built with Unity.",
      url: "https://www.youtube.com/watch?v=teJnlVyOmag",
    },
    {
      id: 12,
      type: "Game Dev",
      title: "Puzzle Game",
      description: "A challenging puzzle game with multiple levels.",
      url: "https://github.com/karjonas/Puzzle-Moppet",
    },
    {
      id: 13,
      type: "Game Dev",
      title: "Endless Runner",
      description: "An endless runner game with procedurally generated levels.",
      url: "https://github.com/striderzz/Unity-Endless-Runner-Procedural-Generation",
    },
    {
      id: 14,
      type: "Game Dev",
      title: "Tower Defense",
      description: "A tower defense game with strategic gameplay.",
      url: "https://www.youtube.com/watch?v=C4_iRLlPNFc",
    },
    {
      id: 15,
      type: "Game Dev",
      title: "RPG Game",
      description: "A role-playing game with character progression and quests.",
      url: "https://github.com/Erikote04/Role-Playing-Game",
    },
    {
      id: 16,
      type: "Game Dev",
      title: "Card Game",
      description: "A digital card game with multiplayer support.",
      url: "https://github.com/mochatek/Numberoli",
    },
    {
      id: 17,
      type: "Game Dev",
      title: "Platform Fighter",
      description:
        "A platform fighting game with various characters and moves.",
      url: "https://github.com/SheteUC/basic-platform-fighter",
    },
    {
      id: 18,
      type: "Game Dev",
      title: "Survival Game",
      description:
        "A survival game where players must manage resources and survive.",
      url: "https://github.com/topics/survival-game?l=python&o=desc&s=updated",
    },
    {
      id: 19,
      type: "Game Dev",
      title: "Racing Game",
      description: "A racing game with various tracks and vehicles.",
      url: "https://github.com/topics/racing-game?l=python",
    },
    {
      id: 20,
      type: "Game Dev",
      title: "Space Shooter",
      description: "A space shooter game with fast-paced action.",
      url: "https://github.com/alperrkilic/Space-Shooter-Project",
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
      url: "https://github.com/alperrkilic/Space-Shooter-Project",
    },
    {
      id: 23,
      type: "Android Dev",
      title: "Expense Manager",
      description: "An app to manage personal finances and track expenses.",
      url: "https://github.com/neeraj542/Personal-Finance-Tracker",
    },
    {
      id: 24,
      type: "Android Dev",
      title: "Notes App",
      description: "A simple notes app with cloud sync.",
      url: "https://github.com/sbs20/filenotes-android#:~:text=Filenotes%20is%20an%20app%20designed%20for%20simple%20note%20taking%20and%20cloud%20sync.",
    },
    {
      id: 25,
      type: "Android Dev",
      title: "Language Learning App",
      description: "An app to learn new languages with interactive lessons.",
      url: "https://github.com/ikyawthetpaing/euolingo",
    },
    {
      id: 26,
      type: "Android Dev",
      title: "Music Player",
      description: "A music player app with playlists and offline support.",
      url: "https://github.com/OxygenCobalt/Auxio",
    },
    {
      id: 27,
      type: "Android Dev",
      title: "Meditation App",
      description: "An app for guided meditations and relaxation techniques.",
      url: "https://github.com/dhyaan-meditation-app",
    },
    {
      id: 28,
      type: "Android Dev",
      title: "Recipe App",
      description:
        "An app to find and save recipes with a shopping list feature.",
      url: "https://github.com/TomBursch/kitchenowl",
    },
    {
      id: 29,
      type: "Android Dev",
      title: "Travel Planner",
      description: "An app to plan trips and manage travel itineraries.",
      url: "https://github.com/Sanjeev-Kumar78/Travel-Itinerary-Generator",
    },
    {
      id: 30,
      type: "Android Dev",
      title: "Habit Tracker",
      description: "An app to build and track daily habits.",
      url: "https://github.com/iSoron/uhabits",
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
