import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connection= async (URL)=>{
    try {
        // const URL='mongodb+srv://harshtakalkar037_db_user:123@cluster0.ggowgdx.mongodb.net/pictnotes?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true});
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }
}
export default connection;