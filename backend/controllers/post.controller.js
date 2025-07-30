import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
export const addNewPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;
        const authorId = req.id;

        if (!image) {
            return res.status(400).json({
                message: 'Image required',
                success: false,
            });
        }

        if (!image.mimetype.startsWith('image')) {
            return res.status(400).json({
                message: 'Invalid file type. Please upload an image.',
                success: false,
            });
        }
        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({ width: 800, height: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        console.log('Cloudinary response:', cloudResponse);

        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId,
        });
        console.log('Post created:', post);

        const user = await User.findById(authorId);
        if (user) {
            user.posts.push(post._id);
            await user.save();
        }

        await post.populate({ path: 'author', select: '-password' });


        return res.status(201).json({
            message: 'New post added',
            post,
            success: true,
        });

    } catch (error) {
        console.error('❌ Error creating post:', error);
        console.error('🧠 Full error object:', JSON.stringify(error, null, 2));
        return res.status(500).json({
            message: 'An error occurred while adding the post.',
            error: error.message,
            success: false,
        });
    }
};

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'username profilePicture' })
            .populate({
                path: 'comments',
                options: { sort: { createdAt: -1 } },
                populate: { path: 'author', select: 'username profilePicture' }
            });

        return res.status(200).json({
            posts,
            success: true
        });
    } catch (error) {
        console.log("Error fetching posts:", error);
        return res.status(500).json({
            message: "Error fetching posts",
            error: error.message,
            success: false
        });
    }
};


export const getUserPost = async (res, req) => {
    try {
        const authorId = req.Id;
        const posts = await Post.find({ author: authorId }).sort({ createAt: -1 }).populate({
            path: 'author',
            select: 'username,profilePicture'
        }).populate({
            path: 'comments', sort: { createAt: -1 },
            populate: { path: 'author', select: 'username,profilePicture' }
        });
        return res.status(200).json({
            posts,
            success: true
        });
    } catch (error) {
        console.log("error");
    }
}
export const likePost = async (req, res) => {
    try {
        const personWhoLiked = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "No post found",
                success: false,
            });
        }

        await post.updateOne({ $addToSet: { likes: personWhoLiked } });
        await post.save();

        return res.status(200).json({
            message: "Post liked",
            success: true,
        });
    } catch (error) {
        console.log("Like Post Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const dislikePost = async (req, res) => {
    try {
        const personWhoLiked = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "No post found",
                success: false,
            });
        }

        await post.updateOne({ $pull: { likes: personWhoLiked } });
        await post.save();

        return res.status(200).json({
            message: "Post disliked",
            success: true,
        });
    } catch (error) {
        console.log("Dislike Post Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;

        const personWhoCommented = req.id;
       
        const { text } = req.body;

        if (!text || text.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Text is required"
            });
        }

        const foundPost = await Post.findById(postId);
        if (!foundPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const comment = await Comment.create({
            text,
            author: personWhoCommented,
            post: postId
        });

        await comment.populate({
            path: 'author',
            select: 'username profilePicture'
        });

        foundPost.comments.push(comment._id);
        await foundPost.save();

        return res.status(201).json({
            success: true,
            message: "Comment added",
            comment
        });

    } catch (error) {
        console.error("Add comment error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

export const getCommentOnPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({ post: postId }).populate('author', 'username,profilePicture');
        if (!comments) {
            return res.status(404).json({
                message: "No comments found",
                success: false
            });
        }
        return res.status(200).json({
            success: true,
            comments
        });
    } catch (error) {
        console.log("error");
    }
}
export const getCommentsOfPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({ post: postId }).populate('author', 'username profilePicture');
        if (!comments) return res.status(404).json({ message: 'No comments found for this post', success: false });
        return res.status(200).json({ success: true, comments });
    } catch (error) {
        console.log(error);
    }
}
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            });
        }

        // Check ownership
        if (post.author.toString() !== authorId) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        // Delete post
        await Post.findByIdAndDelete(postId);

        // Remove post from user's list
        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() !== postId);
        await user.save();

        // Delete comments
        await Comment.deleteMany({ post: postId });

        return res.status(200).json({
            success: true,
            message: 'Post deleted'
        });

    } catch (error) {
        console.error("Delete Post Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export const bookmarkPost = async (res, req) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found', success: false });
        }
        const user = -await User.findById(authorId);
        if (user.bookmarkPost.includes(post._id)) {
            // already bookmarked -> remove from bookmark
            await user.updateOne({ $pull: { bookmarks: post._id } });
            await user.save();
            return res.status(200).json({ type: 'unsaved', message: 'Removed from bookmark', success: true });
        }
        else {
            // bookmark done
            await user.updateOne({ $addToSet: { bookmarks: post._id } });
            await user.save();
            return res.status(200).json({ type: 'saved', message: 'Added bookmarked', success: true });
        }
    } catch (error) {
        console.log("error");
    }
}
export const favoritePost = async (req, res) => {
    try {
        const userId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "No post found", success: false });
        }
        const isFavorited = post.favorites.includes(userId);
        if (isFavorited) {
            await post.updateOne({ $pull: { favorites: userId } });
            await post.save();
            return res.status(200).json({ message: "Removed from favorites", success: true });
        } else {
            await post.updateOne({ $addToSet: { favorites: userId } });
            await post.save();
            return res.status(200).json({ message: "Added to favorites", success: true });
        }
    } catch (error) {
        console.log("Favorite Post Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
