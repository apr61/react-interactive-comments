import React from 'react'
import { useCurrentUser } from '../context/CurrentUserProvider'

function CommentForm({action}) {
  const currentUser = useCurrentUser()
  return (
    <div className='comment__card comment__add__form'>
        <img src={currentUser['image']['webp']} alt={currentUser.username} className="comment__user__img" />
        <textarea className="comment__input__box" placeholder="Add a comment..."></textarea>
        <button className="comment__btn">{action}</button>
    </div>
  )
}

export default CommentForm