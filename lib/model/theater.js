import mongoose, { mongo, Schema } from 'mongoose'
const TheaterSchema = new mongoose.Schema({
    theater_name:{
        type:String,
        required:true,
   },available_times: { 
    type: [String],
    required: true
}
});
export const Theater = mongoose.models.Theater||mongoose.model('Theater',TheaterSchema);
