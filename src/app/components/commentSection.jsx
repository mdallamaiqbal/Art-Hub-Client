'use client';
import { createComment, deleteComment, getCommentsByArtId, updateComment } from '@/lib/actions/comment';
import React, { useState, useEffect } from 'react';


const CommentSection = ({ artId, artistId, currentUser }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

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

    return (
        <div className="mt-8 border border-gray-800 bg-[#16161a] rounded-2xl p-6 md:p-8 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
                💬 Discussion & Feedback ({comments.length})
            </h3>
            
            {currentUser ? (
                <form onSubmit={handlePostComment} className="space-y-4">
                    <div>
                        <textarea 
                            rows="4" 
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="w-full bg-[#111115] border border-gray-800 rounded-xl p-4 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition duration-200 resize-none"
                            placeholder="What do you think about this piece? Share your thoughts..."
                        />
                    </div>
                    <div className="flex justify-end">
                        <button 
                            type="submit" 
                            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition duration-200"
                        >
                            Post Comment
                        </button>
                    </div>
                </form>
            ) : (
                <p className="text-sm text-gray-500 italic bg-[#111115] p-4 rounded-xl border border-gray-800 text-center">
                    🔒 Please login to join the conversation and post a comment.
                </p>
            )}

            <div className="mt-6 pt-6 border-t border-gray-800/60 space-y-4">
                {comments.length === 0 ? (
                    <p className="text-xs text-gray-500 italic text-center py-4">
                        No comments yet. Be the first to start the conversation!
                    </p>
                ) : (
                    comments.map((comment) => {
                        const isCommentOwner = currentUser?.email === comment.userEmail;
                        const isArtOwner = currentUser?.artistId === artistId; 

                        return (
                            <div key={comment._id} className="p-4 bg-[#111115] border border-gray-800 rounded-xl flex items-start gap-3">
                                <img 
                                    src={comment.userImage || "https://i.ibb.co/Ds66VfH/default-avatar.png"} 
                                    alt={comment.userName} 
                                    className="w-8 h-8 rounded-full object-cover border border-gray-800 flex-shrink-0"
                                />
                                
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-bold text-purple-400 truncate">
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
                                        <div className="flex gap-4 mt-2">
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
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default CommentSection;