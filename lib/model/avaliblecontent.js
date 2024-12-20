import mongoose from 'mongoose';
const avaliblesubSchema = new mongoose.Schema({
    Sub:{
        type:String,
    },
    Age:{
        type:String,
    }
});

// Create a model from the schema
export const avaliblesub = mongoose.models.avaliblesub || mongoose.model('avaliblesub', avaliblesubSchema);