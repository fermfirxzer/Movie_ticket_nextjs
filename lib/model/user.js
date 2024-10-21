import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: false,
            default: false // Changed from "false" (string) to false (boolean)
        },
        point: {
            type: Number,
            default: 0,
            min: 0,
        },
        tier: {
            type: String,
            default: ""
        },
        tier_expiration_date: { // Fixed the typo
            type: Date, // Corrected from tpye to type
            default: null // Changed default from "" to null
        },
        tier_status: {
            type: String,
            default: 'active'
        },
    },
    { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
