'use client';
import { createComment, createReply, deleteComment, getCommentsByArtId, updateComment, deleteReply } from '@/lib/actions/comment';
import React, { useState, useEffect } from 'react';

const CommentSection = ({ artId, artistId, currentUser }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [replyText, setReplyText] = useState({});
    const [showReplyForm, setShowReplyForm] = useState({}); 

    const fetchComments = async () => {
        if (!artId) return;
        const resData = await getCommentsByArtId(artId);
        if (Array.isArray(resData)) {
            setComments(resData);
        } else if (resData && Array.isArray(resData.data)) {
            setComments(resData.data);
        } else if (resData && Array.isArray(resData.comments)) {
            setComments(resData.comments);
        } else {
            setComments([]);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [artId]);

    const handlePostComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        if (!currentUser) {
            alert("Please login to post a comment!");
            return;
        }

        const commentData = {
            artId,
            artistId,
            userEmail: currentUser.email,
            userName: currentUser.name || currentUser.displayName || "Anonymous",
            userImage: currentUser.image || currentUser.photoURL || "",
            text: commentText
        };

        const success = await createComment(commentData);
        if (success) {
            setCommentText('');
            fetchComments();
        }
    };

    const handleUpdateComment = async (id) => {
        if (!editText.trim() || !currentUser?.email) return;

        const success = await updateComment(id, editText, currentUser.email);
        if (success) {
            setEditingId(null);
            fetchComments();
        }
    };

    const handleDeleteComment = async (id) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) return;

        const success = await deleteComment(id, currentUser?.email, currentUser?.artistId);
        if (success) {
            fetchComments();
        }
    };

    const handlePostReply = async (commentId) => {
        if (!replyText[commentId]?.trim() || !currentUser) return;

        const replyData = {
            userEmail: currentUser.email,
            userName: currentUser.name || "Anonymous",
            userImage: currentUser.image || "",
            artistId: artistId,
            text: replyText[commentId]
        };

        const success = await createReply(commentId, replyData);
        if (success) {
            setReplyText({ ...replyText, [commentId]: '' });
            setShowReplyForm({ ...showReplyForm, [commentId]: false });
            fetchComments();
        }
    };

    const handleDeleteReply = async (commentId, replyId) => {
        if (!window.confirm("Are you sure you want to delete this reply?")) return;

        const success = await deleteReply(commentId, replyId, currentUser?.email);
        if (success) {
            fetchComments();
        } else {
            alert("Failed to delete reply!");
        }
    };

    return (
        <div className="mt-6 pt-6 border-t border-gray-800/60 space-y-6">
            {currentUser ? (
                <form onSubmit={handlePostComment} className="flex gap-3 items-start bg-[#111115] p-4 rounded-xl border border-gray-800">
                    <img
                        src={currentUser.image || currentUser.photoURL || "https://i.ibb.co/Ds66VfH/default-avatar.png"}
                        alt="Me"
                        className="w-8 h-8 rounded-full object-cover border border-gray-800 flex-shrink-0"
                    />
                    <div className="flex-1 space-y-2">
                        <textarea
                            rows="2"
                            placeholder="Share your thoughts about this art..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="w-full bg-[#16161a] border border-gray-800 rounded-lg p-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-5 py-2 rounded-lg transition"
                            >
                                Post Comment
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <p className="text-xs text-gray-500 text-center py-2 italic bg-[#111115] border border-gray-800 rounded-xl">
                    Please log in to participate in the discussion.
                </p>
            )}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p className="text-xs text-gray-500 italic text-center py-4">
                        No comments yet. Be the first to start the conversation!
                    </p>
                ) : (
                    comments.map((comment) => {
                        const isCommentOwner = currentUser?.email === comment.userEmail;
                        const isArtOwner = currentUser?.artistId === artistId || currentUser?._id === artistId;

                        return (
                            <div key={comment._id} className="p-4 bg-[#111115] border border-gray-800 rounded-xl space-y-4">
                                <div className="flex items-start gap-3">
                                    <img
                                        src={comment.userImage || "https://i.ibb.co/Ds66VfH/default-avatar.png"}
                                        alt={comment.userName}
                                        className="w-8 h-8 rounded-full object-cover border border-gray-800 flex-shrink-0"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs font-bold text-purple-400">
                                            {comment.userName}
                                        </h4>

                                        {editingId === comment._id ? (
                                            <div className="mt-2 space-y-2">
                                                <input
                                                    type="text"
                                                    value={editText}
                                                    onChange={(e) => setEditText(e.target.value)}
                                                    className="w-full bg-[#16161a] border border-gray-700 rounded-lg p-2 text-sm text-gray-200 focus:outline-none focus:border-purple-500"
                                                    autoFocus
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleUpdateComment(comment._id)}
                                                        className="text-xs bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-white font-medium transition"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-white font-medium transition"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-300 mt-1 whitespace-pre-wrap break-words">
                                                {comment.text}
                                            </p>
                                        )}

                                        {editingId !== comment._id && (
                                            <div className="flex gap-4 mt-2 items-center">
                                                {currentUser && (
                                                    <button
                                                        onClick={() => setShowReplyForm({ ...showReplyForm, [comment._id]: !showReplyForm[comment._id] })}
                                                        className="text-[11px] font-semibold text-gray-400 hover:text-purple-400 transition"
                                                    >
                                                        ↩️ Reply
                                                    </button>
                                                )}
                                                {isCommentOwner && (
                                                    <button
                                                        onClick={() => { setEditingId(comment._id); setEditText(comment.text); }}
                                                        className="text-[11px] font-semibold text-blue-400 hover:underline transition"
                                                    >
                                                        ✏️ Edit
                                                    </button>
                                                )}
                                                {(isCommentOwner || isArtOwner) && (
                                                    <button
                                                        onClick={() => handleDeleteComment(comment._id)}
                                                        className="text-[11px] font-semibold text-red-400 hover:underline transition"
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {comment.replies && comment.replies.length > 0 && (
                                    <div className="ml-10 pl-4 border-l border-gray-800 space-y-3">
                                        {comment.replies.map((reply, index) => {
                                            const canDeleteReply = currentUser?.email === reply.userEmail;

                                            return (
                                                <div key={reply.replyId || index} className="flex items-start gap-2 bg-[#16161a]/60 p-3 rounded-xl border border-gray-800/40 group relative">
                                                    <img
                                                        src={reply.userImage || "https://i.ibb.co/Ds66VfH/default-avatar.png"}
                                                        alt=""
                                                        className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <h5 className="text-[11px] font-bold text-pink-400">
                                                                {reply.userName}
                                                            </h5>

                                                            {canDeleteReply && (
                                                                <button
                                                                    onClick={() => handleDeleteReply(comment._id, reply.replyId)}
                                                                    className="text-[10px] text-red-400 hover:text-red-500 font-semibold transition md:opacity-0 md:group-hover:opacity-100"
                                                                    title="Delete Reply"
                                                                >
                                                                    🗑️ Delete
                                                                </button>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-400 mt-0.5 whitespace-pre-wrap break-words">{reply.text}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {showReplyForm[comment._id] && (
                                    <div className="ml-10 flex gap-2 pt-2 items-center">
                                        <input
                                            type="text"
                                            placeholder="Write a reply..."
                                            value={replyText[comment._id] || ''}
                                            onChange={(e) => setReplyText({ ...replyText, [comment._id]: e.target.value })}
                                            className="flex-1 bg-[#111115] border border-gray-800 rounded-lg p-2.5 text-xs text-gray-200 focus:outline-none focus:border-purple-500"
                                        />
                                        <button
                                            onClick={() => handlePostReply(comment._id)}
                                            className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition"
                                        >
                                            Reply
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default CommentSection;