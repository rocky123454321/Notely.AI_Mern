import mongoose from 'mongoose'
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOLDB_URL)
        console.log("MONGOL DB CONNECTED");
    } catch (error) {
        console.log(error)
    }
}
