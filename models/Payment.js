import mongoose from "mongoose";
const { Schema, model } = mongoose;
import User from "./User";

const PaymentSchema = new Schema(
	{
		who:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		name: { type: String, required: true },
		to_user: { type: String, required: true },
		oid: { type: String, required: true },
		message: { type: String },
		amount: { type: Number, required: true },
		done: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export default mongoose.models.Payment || model("Payment", PaymentSchema);
