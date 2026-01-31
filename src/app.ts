import express from 'express';
import userRoutes from './routes/user.routes';
import errorMiddleware from './middlewares/error.middleware';
import authRoutes from './auth/auth.routes';


const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(errorMiddleware);  

export default app;

// Why not put routes in server.ts?

// server.ts → infrastructure
// app.ts → application logic
// Improves testability

// (Must Know)
// Why process.exit(1)?
// Why MongoDB connection is async?
// Difference between MongoDB driver and Mongoose?


// Why process.exit(1)?
// process.exit(1) terminates the Node.js process with an exit code of 1, indicating an error occurred. This is used in server startup scripts to stop execution if critical initialization fails (e.g., database connection), preventing the app from running in an unstable state. Exit code 0 means success; non-zero codes signal failures.

// Why MongoDB connection is async?
// MongoDB connections are asynchronous because establishing a network connection to the database server takes time and shouldn't block the main thread. Node.js is single-threaded, so async operations (using promises or callbacks) allow the event loop to continue processing other tasks, improving performance and responsiveness.

// Difference between MongoDB driver and Mongoose?
// The MongoDB driver (e.g., mongodb package) is a low-level library that provides direct access to MongoDB's native API for basic operations like connecting, querying, and CRUD. Mongoose is an ODM (Object Data Modeling) library built on top of the driver, offering schema validation, middleware, and higher-level abstractions for modeling data, making it easier to work with MongoDB in applications. Use the driver for simple, raw queries; use Mongoose for structured, schema-based development.