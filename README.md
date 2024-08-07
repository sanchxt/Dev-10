# Dev-10

A comprehensive resource hub, made specifically for all types of experienced, as well as aspiring developers, using the MERN stack.

## Contains the following features:

- Authentication system
- Users can explore collections of resources, which contains who the resources are for, what purpose they solve, and links that can help them learn
- Similar to this, there are collections of roadmaps as well. Our target users can explore roadmaps and decide the path they need to take in order to reach their goal.
- Consumers of these resources and roadmaps have the feature to rate and comment on them to give feedback on how good of a collection it is, what it lacks, where it excels, etc.
- Creators of those collections have the full ability to later edit or delete their collection, or check the total views of it over time, and see the feedback, responses, and ratings their collections are getting.
- Consumers have the ability to search for specific roadmaps or resources, or sort them based on factors such as ratings / popularity, creation date, etc.
- We, the admins of the website, provide our own officially made resources and roadmaps as well, and users can tell them apart from community-made collections
- Users have the ability to bookmark their favorite resources or collections, so they can easily check them out later.
- On the home page, their last 3 viewed resources and roadmaps are displayed as well, for easy accessibility.
- We also give a curated list of projects for different types of developers, that could aid them in taking their skills to the next level.
- Has an AI chatbot for people to interact with, and clear their doubts up in real time.
- And many more side features, which are updated regularly

<hr /><hr />

# Project Explanation

1.  The [**backend**](https://github.com/dev10-org/Dev-10/tree/main/backend) folder contains all of the server's files (database URIs, routes, controllers, schemas, etc.)
2.  The [**frontend**](https://github.com/dev10-org/Dev-10/tree/main/frontend) folder contains all of the components which are displayed to the client (UI / UX, CSS, components, API integrations, state management, etc.)

## backend folder

> **[server.js](https://github.com/dev10-org/Dev-10/blob/main/backend/server.js)**

Main entry point for the server to access everything from. This is the only file that runs when the server start, and this file alone manages everything.

    app.use(express.json());
    app.use(express.urlencoded({  extended:  true  }));
    app.use(cookieParser());

    cron.schedule("0 0 1 * *",  async  ()  =>  {
        try  {
    	    await  Resource.updateMany({},  {  $set:  {  monthlyViews:  0  }  });
        }  catch (error) {
    	    console.error("error resetting monthly views:",  error);
        }
    });
    app.use("/api/users",  userRoutes);
    app.use("/api/resources",  resourceRoutes);
    app.use("/api/resources/report",  resourceReportRoutes);
    app.use("/api/notes",  noteRoutes);
    app.use(notFound);
    app.use(errorHandler);

Adds middleware to parse JSON and cookies in API routes, and adds a cron job that resets monthlyViews of resources every month at midnight. Also adds base path for each type of routes, and adds middleware at the end for error handlers.

> **folder [routes/](https://github.com/dev10-org/Dev-10/tree/main/backend/routes)**

Contains extended paths for controller functions, that concatenate with the base path in server.js and runs the corresponding controller function mentioned in it, along with the request method.

    const  createResourceRateLimiter  =  rateLimit({
        windowMs:  15  *  60  *  60,
        limit:  20,
        message:  "Too many requests to create collections, please try again later.",
    });

Creates a rate limiter, so that an end user can't send too many requests at once

> **folder [models/](https://github.com/dev10-org/Dev-10/tree/main/backend/models)**

Defines schemas of different types of models.

    userSchema.methods.matchPassword  =  async  function  (enteredPassword)  {
        return  await  bcrypt.compare(enteredPassword,  this.password);
    };

    userSchema.pre("save",  async  function  (next)  {
        if (!this.isModified("password")) {
        next();
    }
        const  salt  =  await  bcrypt.genSalt(8);
        this.password  =  await  bcrypt.hash(this.password,  salt);
    });

Defines a function that hashes the password, which executes before any data is saved in this model. Also defines a helper function that helps compare hashed passwords to normal passwords, to make it easier to authenticate in the backend.

> **folder [middleware/](https://github.com/dev10-org/Dev-10/tree/main/backend/middleware)**

Defines middlewares. [_Auth middleware_](https://github.com/dev10-org/Dev-10/blob/main/backend/middleware/authMiddleware.js) checks if the user is logged in before executing any controller function which is called right after this middleware is called;
[_Error middleware_](https://github.com/dev10-org/Dev-10/blob/main/backend/middleware/errorMiddleware.js) runs right after a controller function is called, in order to handle errors accordingly.

> **folder [config/](https://github.com/dev10-org/Dev-10/tree/main/backend/config)**

Has a file which contains a function that connects to the MongoDB cloud database (called in [server.js](https://github.com/dev10-org/Dev-10/blob/main/backend/server.js))

> **folder [controllers/](https://github.com/dev10-org/Dev-10/tree/main/backend/controllers)**

Contains functions that are executed on different routes and request methods.
Uses `asyncHandler` library to handle asynchronous functions without having to use try-catch repeatedly

> **folder [utils/](https://github.com/dev10-org/Dev-10/tree/main/backend/utils)**

Contains some utility helper functions that are used by controllers and middlewares
