import mongoose, { Schema } from 'mongoose';
const promotionitemSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    name: {
        type: String, //
        required: true,
        unique: true,
    },
    point: {
        type: Number,
        required: true, 
    },
    imageUrl: {
        type: String,
        required: true,
    },

});
export const PromotionItem =mongoose.models.PromotionItem|| mongoose.model('PromotionItem',promotionitemSchema)

