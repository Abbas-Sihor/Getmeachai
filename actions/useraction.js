"use server";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDb from "@/db/Connectdb";
import User from "@/models/User";
import Post from "@/models/Post";
import Comment from "@/models/Comment";

export const initiate = async (amount, to_username, paymentform,name ,who) => {
	await connectDb();
	const user = await User.findOne({ username: to_username });
	
	// if(!user){
		//   return console.error("User Does't exsist");
		// }
		console.log(user.razorpayid)
		var instance = new Razorpay({
			
			key_id: user.razorpayid,
			key_secret: user.razorpaysecret,
		});

	let options = {
		amount: Number.parseInt(amount),
		currency: "INR",
	};

	let x = await instance.orders.create(options);

	await Payment.create({
		who:who,
		oid: x.id,
		amount: amount / 100,
		to_user: to_username,
		name: name,
		message: paymentform.message,
	});

	return x;
};

export const fetchUser = async (username) => {
	await connectDb();

  try {
    
    const user = await User.findOne({ username }).lean(); // Fetch as a plain object
    if (user && user._id) user._id = user._id.toString(); // Convert _id to string
    return user;
  } catch (error) {
    console.log(error)
  }
};

export const fetchPayment = async (username,by) => {
	await connectDb();
	const payments = await Payment.find({ to_user: username, done: true })
		.sort({ [by]: -1 })
		.limit(10)
		.lean(); // Fetch as plain objects
	payments.forEach((payment) => {
		if (payment._id) payment._id = payment._id.toString(); // Convert _id to string
	});
	return payments;
};
export const fetchUserPayments = async (who ,id) => {
	await connectDb();
	const payments = await Payment.find({ [who]: id, done: true })
	  .populate({path:"who",
			select:" username profilepic"
		})
		.sort({ createdAt: -1 })
		.lean(); // Fetch as plain objects
	payments.forEach((payment) => {
		if (payment._id) payment._id = payment._id.toString(); // Convert _id to string
	});
	
	return payments;
};

export const noOfContributor= async(username)=>{
	await connectDb();
	const payments = await Payment.find({ to_user: username, done: "true" })
	return(payments.length)

}

export const updateUserData = async (id, data) => {
	try {
		await connectDb();
		let user = await User.findByIdAndUpdate(
			id, // ID of the user to update
			data, // Data to update
			{ new: true, runValidators: true } // Return the updated document and run validation
		).lean();
		return user; // Return the updated user
	} catch (error) {
		console.error("Error updating user data:", error);
		throw error; // Propagate the error for higher-level handling
	}
};

export const createpost = async (data, id, username, tag) => {
	await connectDb();

	try {
		const post = await new Post({
			author: id,
			username: username,
			thumbnail: data.thumbnail,
			coverpic: data.coverpic,
			title: data.title,
			description: data.description,
			tags: tag,
			maincontext: data.maincontext,
		});
		const result = await post.save();
		console.log("post created", post);
		return result.toObject();
	} catch (error) {
		console.log("Error", error);
	}
};

export const fetchpost = async (username) => {
	await connectDb();
	const posts = await Post.find({ username: username }).lean(); // Fetch as plain objects
	return posts.map((post) => ({
		...post,
		_id: post._id.toString(), // Convert MongoDB ObjectId to string
		author: post._id.toString(), // Convert MongoDB ObjectId to string
		createdAt: post.createdAt?.toISOString(), // Convert Date to ISO string
		updatedAt: post.updatedAt?.toISOString(), // Convert Date to ISO string
	}));
};
export const findpost = async (id) => {
	await connectDb();
	const post = await Post.findById({ _id: id }).lean(); // Fetch as plain objects
	return {
		...post,
		_id: post._id.toString(), // Convert MongoDB ObjectId to string
		author: post.author.toString(), // Convert MongoDB ObjectId to string
		createdAt: post.createdAt?.toISOString(), // Convert Date to ISO string
		updatedAt: post.updatedAt?.toISOString(), // Convert Date to ISO string
	};
};

export const likepost = async (postid, userusername) => {
	await connectDb();
	const post = await Post.findById({ _id: postid });
	if (!post) {
		return console.error("post doest exist");
	}
	try {
		if (post.likeby.includes(userusername)) {
			console.log("i am inside")
			post.likeby = post.likeby.filter(username => username !== userusername);
			console.log(post.likeby)
			post.likecount -= 1;
			await post.save();
		}
		else{

			post.likeby.push(userusername);
			post.likecount += 1;
			await post.save()
		}
	} catch (error) {
		console.error(error);
	}
};


export const fetchComments = async (postId) => {
	await connectDb()
	try {
		// Find comments for the given postId
		const comments = await Comment.find({ postId })
			.sort({ createdAt: -1 }); // Sort by newest first
			const formattedComments = comments.map(comment => ({
      _id: comment._id.toString(),
      postId: comment.postId.toString(),
      content: comment.content,
      username: comment.username,
      userProfilePic: comment.userProfilePic,
      createdAt: comment.createdAt?.toISOString(),
      updatedAt: comment.updatedAt?.toISOString(),
    }));
		return formattedComments
	} catch (error) {
		console.error('Error fetching comments:', error);
		throw new Error('Could not fetch comments');
	}
};

export const addcommnet =async(postId,username,content)=>{
	await connectDb()
	const user = await User.findOne({username})	
	try {
		// Create a new comment instance
		const newComment = new Comment({
			postId,             // The ID of the post this comment is associated with
			username,       // The ID of the user who is making the comment
			userProfilePic:user.profilepic,     // Profile picture URL of the user
			content,            // The content of the comment
		});
		// Save the comment to the database
		await newComment.save();
		console.log("comment added successfully")
	} catch (error) {
		console.error('Error adding comment:', error);
		throw new Error('Could not add the comment');
	}
};


export const fetchrecenthpost = async (username,currentpostid) => {
	await connectDb();
	const posts = await Post.find({ username: username }).lean(); // Fetch as plain objects
	const filterPost = posts.filter((post)=>post._id.toString()!==currentpostid.toString())
	return filterPost.map((post) => ({
		...post,
		_id: post._id.toString(), // Convert MongoDB ObjectId to string
		author: post._id.toString(), // Convert MongoDB ObjectId to string
		createdAt: post.createdAt?.toISOString(), // Convert Date to ISO string
		updatedAt: post.updatedAt?.toISOString(), // Convert Date to ISO string
	}));
};


export const followUser=async(authorusername, userusername)=>{
	await connectDb()

	try {
		const author = await User.findOne({username:authorusername})
		if(!author) return

		const isFollowing= author.followby.includes(userusername)

		if(isFollowing){
			// Unfollow

			await User.updateOne({username:authorusername},{
				$pull:{followby:userusername},
				$inc:{followers:-1}
			})
		
		await User.updateOne({username:userusername},{
			$pull:{following:authorusername}
		})
	}
		else{
			await User.updateOne({username:authorusername},{
				$addToSet:{followby:userusername},
				$inc:{followers:+1}
			})
			await User.updateOne({username:userusername},{
				$addToSet:{following:authorusername},
				
			})

		}
		} catch (error) {
		console.log("Internal error occured",error)
	}

} 

export const fetchPostFromFollowedAuthors=async(userusername)=>{
	await connectDb()

	try {
		const user = await User.findOne({username:userusername})
	   if(!user) return
		 const authorfollowing = user.following
		 if (!user.following || authorfollowing.length === 0) {
			return await fetchTrendingPosts()
}
		
		 const posts =  await Post.find({username : {$in :authorfollowing}}).sort({createdAt:-1}).limit(7).populate({
    path: "author",
    select: "username profilepic", 
  }).lean()
		 const leanPost= posts.map((post) => ({
		...post,
		_id: post._id.toString(), // Convert MongoDB ObjectId to string
		
		createdAt: post.createdAt?.toISOString(), // Convert Date to ISO string
		updatedAt: post.updatedAt?.toISOString(), // Convert Date to ISO string
	}));
	return ({message:false, posts:leanPost})
	} catch (error) {
		console.log("Internal error occured",error)
	}


}

export const fetchTreandingAuthor=async(userusername)=>{

	await connectDb()
	try {
		const user = await User.findOne({username:userusername})
	   if(!user) return
		 const authorfollowing =   user.following 
		 
		 const treandingAuthors= await User.find({username:{$nin:authorfollowing}}).sort({followers:-1}).limit(5).lean()
		
		 return treandingAuthors.map((author) => ({
		...author,
		_id: author._id.toString(), // Convert MongoDB ObjectId to string
		createdAt: author.createdAt?.toISOString(), // Convert Date to ISO string
		updatedAt: author.updatedAt?.toISOString(), // Convert Date to ISO string
	}));
	} catch (error) {
		console.log("Internal error occured",error)
	}

}

export const fetchTrendingPosts = async () => {
  await connectDb();

  try {
    const posts = await Post.find()
      .sort({ likecount: -1, createdAt: -1 }) // trending + recent
      .limit(7)
      .populate({
        path: "author",
        select: "username profilepic",
      })
      .lean();

    const leanPost= posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt?.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
    }));
		return({message:true,posts:leanPost})
  } catch (error) {
    console.log("Internal error occurred", error);
  }
};


export const fetchOtherPostFromNotFollowingAuthors = async (userusername) => {
  await connectDb();

  try {
    const user = await User.findOne({ username: userusername });
    if (!user) return [];

    const following = user.following || [];

    const posts = await Post.find({
      username: {
        $nin: [...following, userusername],
      },
    })
      .sort({ createdAt: -1 }) // recent posts
      .limit(7)
      .populate({
        path: "author",
        select: "username profilepic",
      })
      .lean();

    return posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt?.toISOString(),
      updatedAt: post.updatedAt?.toISOString(),
    }));
  } catch (error) {
    console.log("Internal error occurred", error);
    return [];
  }
};
