import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useData } from '../context/ContextProvider'
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { calculateScore, dateFormatterToAgo } from '../utils/commentUtilFunctions';

function Comment({ comment }) {
    const { currentUser, addNewComment, deleteComment, updateComment, voteComment } = useData();
    const [isReplying, setIsReplying] = useState(false)
    const [isEditingReply, setIsEditingReply] = useState(false)
    const [updateMessage, setUpdateMessage] = useState(comment.content)
    function onCreateComment(message, parentId) {
        addNewComment(message, parentId)
        setIsReplying(false)
    }
    function onUpdateComment(updateMessage, commentId, parentId) {
        updateComment(updateMessage, commentId, parentId)
        setUpdateMessage('')
        setIsEditingReply(false)
    }
    function onDeleteComment(commentId, parentId) {
        deleteComment(commentId, parentId)
    }
    function scoreFunctionality(action) {
        let scoreUsersSet = new Set()
        comment.score.forEach(sc => {
            if (!scoreUsersSet.has(sc.username)) {
                scoreUsersSet.add(sc.username)
            }
        })
        if (!scoreUsersSet.has(currentUser.username)) {
            comment.score.push({ "username": currentUser.username, "vote": 0 })
        }
        let updatedScores = comment.score.map(sc => {
            if (sc.username === currentUser.username) {
                if (action === 'upvote') {
                    sc.vote = sc.vote === 0 ? 1 : 0;
                }
                if (action === 'downvote') {
                    sc.vote = sc.vote === 0 ? -1 : 0;
                }
            }
            return sc
        })
        voteComment(comment.id, comment.parentId !== 0 ? comment.parentId : 0, updatedScores)
    }
    return (
        <>
            <div className='comment__card'>
                <div className="comment__header">
                    <img className="comment__user__img" src={`${comment.user['image'].webp}`} alt={comment.user['username']} />
                    <h3 className="comment__user__name">{comment.user['username']}</h3>{comment.user['username'] === currentUser.username ? <span className="current_user">you</span> : ''}
                    <p className="comment__createdat">{dateFormatterToAgo(new Date(comment.createdAt))}</p>
                </div>
                <article className="comment__message">
                    {!isEditingReply ? (
                        <p>
                            {comment['replyingTo'] ? <span className='atrateuser'>@{comment['replyingTo']} </span> : ''} {comment.content}
                        </p>
                    ) : (
                        <textarea className="comment__input__box" value={updateMessage === '' ? comment.content : updateMessage}
                            autoFocus onFocus={(e) => { let val = e.target.value; e.target.value = ''; e.target.value = val }} 
                            onChange={(e) => setUpdateMessage(e.target.value)} />
                    )}
                </article>
                <div className="comment__score">
                    <button className='comment__score__btn' onClick={() => scoreFunctionality('upvote')}><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
                    <span className="score">{calculateScore(comment.score)}</span>
                    <button className='comment__score__btn' onClick={() => scoreFunctionality('downvote')}><FontAwesomeIcon icon="fa-solid fa-minus" /></button>
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
                        onClick={() => onUpdateComment(updateMessage, comment.id, comment.parentId !== 0 ? comment.parentId : 0)}>Update</button>
                )}
            </div>
            {isReplying && <CommentForm action={'Reply'} replyingTo={comment.user.username} autofocus={true}
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