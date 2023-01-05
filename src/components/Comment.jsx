import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useData, useDateFormatterToAgo } from '../context/ContextProvider'
import CommentList from './CommentList';
import CommentForm from './CommentForm';

function Comment({ comment }) {
    const { currentUser, addNewComment, deleteComment, updateComment } = useData();
    const [isReplying, setIsReplying] = useState(false)
    const [isEditingReply, setIsEditingReply] = useState(false)
    const [updateMessage, setUpdateMessage] = useState(comment.content)
    function onCreateComment(message, parentId) {
        addNewComment(message, parentId)
        setIsReplying(false)
    }
    function onUpdateComment(updateMessage, commentId, parentId){
        updateComment(updateMessage, commentId, parentId)
        setUpdateMessage('')
        setIsEditingReply(false)
    }
    function onDeleteComment(commentId, parentId) {
        deleteComment(commentId, parentId)
    }
    return (
        <>
            <div className='comment__card'>
                <div className="comment__header">
                    <img className="comment__user__img" src={`${comment.user['image'].webp}`} alt={comment.user['username']} />
                    <h3 className="comment__user__name">{comment.user['username']}</h3>{comment.user['username'] === currentUser.username ? <span className="current_user">you</span> : ''}
                    <p className="comment__createdat">{useDateFormatterToAgo(new Date(comment.createdAt))}</p>
                </div>
                <article className="comment__message">
                    {!isEditingReply ? (
                        <p>
                            {comment['replyingTo'] ? <span className='atrateuser'>@{comment['replyingTo']} </span> : ''} {comment.content}
                        </p>
                    ) : (
                        <textarea className="comment__input__box" value={updateMessage}
                            onChange={(e) => setUpdateMessage(e.target.value)} />
                    )}
                </article>
                <div className="comment__score">
                    <button className='comment__score__btn'><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
                    <span className="score">{comment.score.length}</span>
                    <button className='comment__score__btn'><FontAwesomeIcon icon="fa-solid fa-minus" /></button>
                </div>
                <div className="comment__controls">
                    {comment.user['username'] === currentUser.username ?
                        <>
                            <button className="comment__btn controls__btn controls__btn--del" onClick={() => onDeleteComment(comment.id, comment.parentId)}>
                                <FontAwesomeIcon icon="fa-solid fa-trash" />Delete</button>
                            <button className="comment__btn controls__btn" onClick={() => setIsEditingReply(oldvalue => !oldvalue)}>
                                <FontAwesomeIcon icon="fa-solid fa-pen" />Edit</button>
                        </>
                        : <button className="comment__btn controls__btn" onClick={() => setIsReplying(oldvalue => !oldvalue)}><FontAwesomeIcon icon="fa-solid fa-reply" />Reply</button>}
                </div>
                {isEditingReply && (
                    <button className="comment__btn comment__btn--update" 
                    onClick={() => onUpdateComment(updateMessage, comment.id, comment.parentId!==0? comment.parentId: 0)}>Update</button>
                )}
            </div>
            {isReplying && <CommentForm action={'Reply'} replyingTo={comment.user.username}
                addNewComment={onCreateComment} parentId={comment.parentId !== 0 ? comment.parentId : comment.id} />}
            {comment.replies?.length > 0 && (
                <div className="nested__comments__stack">
                    <button className="line"></button>
                    <div className="nested__comments">
                        <CommentList comments={comment.replies} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Comment