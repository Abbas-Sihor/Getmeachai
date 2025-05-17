
import mongoose from "mongoose";

const connectDb = async () => {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
            });
            console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
            return conn;
            
        } catch (error) {
          console.log("Database connection Failed")
            console.error(error.message);
            process.exit(1);
        }
    }

  export default connectDb;