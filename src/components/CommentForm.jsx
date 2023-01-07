import React, { useState } from 'react'
import { useData } from '../context/ContextProvider'

function CommentForm({ action , replyingTo, autofocus, addNewComment, parentId}) {
  const {currentUser} = useData()
  const [message, setMessage] = useState(replyingTo?`@${replyingTo}`:'')
  function handleClick(){
    addNewComment(message, parentId)
    setMessage('')
  }
  return (
    <div className='comment__card comment__add__form'>
      <img src={currentUser['image']['webp']} alt={currentUser.username} className="comment__user__img" />
      <textarea className="comment__input__box" placeholder="Add a comment..." value={message} autoFocus={autofocus}
       onChange = {(e) => setMessage(e.target.value)} 
       onFocus={(e)=>{let val = e.target.value; e.target.value = ''; e.target.value= val}}/>
      <button className="comment__btn" onClick={handleClick}>{action}</button>
    </div>
  )
}

export default CommentForm