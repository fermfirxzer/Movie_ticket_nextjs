import mongoose, { Schema } from 'mongoose'

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
            default: "false"
        },
        point:{
            type:Number,
            default:0,
            min:0,
        },
        tier: String,
        tier_expiration_date: Date,
        tier_status: { type: String, default: 'active' },
    },
    { timestamps: true }
)

export const User = mongoose.models.User || mongoose.model("User", userSchema);
