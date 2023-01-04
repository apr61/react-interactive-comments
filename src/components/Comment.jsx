import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCurrentUser } from '../context/CurrentUserProvider'
import CommentList from './CommentList';
import CommentForm from './CommentForm';


function Comment({ comment }) {
    const currentUser = useCurrentUser();
    const [isReplying, setIsReplying] = useState(false)
    return (
        <>
            <div className='comment__card'>
                <div className="comment__header">
                    <img className="comment__user__img" src={`${comment.user['image'].webp}`} alt={comment.user['username']} />
                    <h3 className="comment__user__name">{comment.user['username']}</h3>{comment.user['username'] === currentUser.username ? <span className="current_user">you</span> : ''}
                    <p className="comment__createdat">{comment.createdAt}</p>
                </div>
                <article className="comment__message">
                    <p>
                        {comment['replyingTo'] ? <span className='atrateuser'>@{comment['replyingTo']} </span>: ''} {comment.content}
                    </p>
                </article>
                <div className="comment__score">
                    <button className='comment__score__btn'><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
                    <span className="score">{comment.score}</span>
                    <button className='comment__score__btn'><FontAwesomeIcon icon="fa-solid fa-minus" /></button>
                </div>
                <div className="comment__controls">
                    {comment.user['username'] === currentUser.username ?
                        <>
                            <button className="comment__btn controls__btn controls__btn--del"><FontAwesomeIcon icon="fa-solid fa-trash" />Delete</button>
                            <button className="comment__btn controls__btn" ><FontAwesomeIcon icon="fa-solid fa-pen" />Edit</button>
                        </>
                        : <button className="comment__btn controls__btn" onClick={() => setIsReplying(oldvalue => !oldvalue)}><FontAwesomeIcon icon="fa-solid fa-reply" />Reply</button>}
                </div>
            </div>
            {isReplying && <CommentForm action={'Reply'} />}
            {comment.replies?.length > 0 && (
                <div className="nested__comments__stack">
                    <button className="line"></button>
                    <div className="nested__stack">
                        <CommentList comments={comment.replies} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Comment