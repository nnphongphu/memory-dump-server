import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    images: [{
        imageId: {
            type: String,
        },
        caption: {
            type: String,
        },
        isFavourite: {
            type: Boolean,
            default: false,
        }
    }],
});

export default mongoose.model("User", userSchema);