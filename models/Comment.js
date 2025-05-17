import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CommentSchema = new Schema(
	{
		postId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		userProfilePic: {
			type: String,
			default: '', // Provide a default value if not always available
		},
		content: {
			type: String,
			required: true,
			trim: true,
			maxlength: 500, // Optional, limit comment length
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);
export default mongoose.models.Comment || model('Comment', CommentSchema);
