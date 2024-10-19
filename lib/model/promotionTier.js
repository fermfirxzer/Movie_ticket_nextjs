import mongoose, { Schema } from 'mongoose';
const promotionitemSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    name: {
        type: String, 
        required: true,
        unique: true,
    },
    price:{
        type:Number,
        required: true,
    },
    discount:{
        type:Number,
        required: true,
    }
});
export const PromotionTier =mongoose.models.PromotionTier|| mongoose.model('PromotionTier',promotionitemSchema)

