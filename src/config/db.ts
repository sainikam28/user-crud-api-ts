import mongoose from 'mongoose';

// const connectDB = async (): Promise<void> => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI as string);
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}

export default connectDB;

// 🧠 Important Concepts

// Mongoose creates connection pool

// Reused across requests

// Avoid reconnecting per request (very common mistake)
