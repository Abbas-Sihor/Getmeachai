import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
	{
		email: { type: String, require: true },
		name: { type: String,  },
		contact: { type: Number,  },
		username: { type: String, require: true },
		followers:{type:Number,default:0 },
		followby: [
			{
				type:String,
				ref: "User",
			},
		],
		following: [
			{
				type:String,
				ref: "User",
			},
		],
		tagline: { type: String},
		coverpic: { type: String,  },
		profilepic: { type: String,  },
		razorpayid: { type: String, },
		razorpaysecret: { type: String, },
	},
	{ timestamps: true }
);

export default mongoose.models.User || model("User", UserSchema);
