import React from 'react'
import CommentForm from '../components/CommentForm'
import CommentList from '../components/CommentList'
import { useData } from '../context/ContextProvider'

function Comments() {
  const { comments, addNewComment } = useData()

  return (
    <>
      <CommentList comments={comments} />
      <CommentForm action={'Send'} replyingTo={''} autofocus={false} addNewComment={addNewComment} parentId={0} />
    </>
  )
}

export default Comments