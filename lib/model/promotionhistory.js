import mongoose from 'mongoose';

const promotionHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    type: { type: String, enum: ['Tier', 'Item'], required: true }, 
    items: [
        {   
            item_id: { type: Number, ref: 'Promotionitem'},
            Tier_id: { type: Number, ref: 'PromotionTier' },
            name: { type: String, required: true },
            discount:{type:Number},
            quantity: { type: Number, required: true, default: 1 },
        }
    ],
    purchaseTime: { type: Date, default: Date.now },
    Total: { type: Number, required: true },
});

export const PromotionHistory = mongoose.models.PromotionHistory || mongoose.model('PromotionHistory', promotionHistorySchema);
