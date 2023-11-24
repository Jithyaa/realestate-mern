import mongoose from "mongoose";

export default async function connectDB(){
    const db = await mongoose.connect("mongodb+srv://jithya1504:jithya1504@realestate.tknsywo.mongodb.net/realestate?retryWrites=true&w=majority")
}