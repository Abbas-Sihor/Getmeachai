import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import User from "./User";

const PostSchema = new Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		username: { type: String, required: true },
		thumbnail: { type: String, required: true },
		coverpic: { type: String, required: true },
		title: { type: String, required: true },
		description: { type: String, required: true },
		tags: { type: [String] },
		maincontext: { type: String, required: true },
		likecount: { type: Number, default: 0 },
		likeby: [
			{
				type:String,
				ref: User,
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.models.Post || model("Post", PostSchema);
