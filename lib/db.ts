import mongoose from "mongoose";

const MONGODB_URI = process.env.MONDODB_URI || "";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongooseConnection;

if (!cached) {
    cached = global.mongooseConnection = {conn: null, promise: null};
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }   
    if (!cached.promise) {

        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
        };
        mongoose
        .connect(MONGODB_URI, opts)
        .then((mongoose) => mongoose.Connection);
    }

    try {
        await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;                                            
    
    }
    return cached.conn;
}
