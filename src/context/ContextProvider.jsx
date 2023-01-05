
import { createContext, useContext, useState } from 'react'
import data from '../data/data.json'

const Context = createContext()

export function useData() {
  return useContext(Context)
}

function ContextProvider({ children }) {
  const [comments, setComments] = useState(data.comments)
  const currentUser = data['currentUser']

  function addNewComment(message, parentId) {
    let replyToAt = message.split(' ')[0].toString()
    let replyingTo = message.startsWith('@') ? replyToAt.slice(1, replyToAt.length) : ''
    message = message.startsWith('@') ? message.slice(replyingTo.length + 1, message.length) : message
    let newComment = {
      "id": Date.now(),
      "content": message,
      "createdAt": 'now',
      "score": 0,
      "user": currentUser,
      'replies': [],
      "parentId": parentId,
      "replyingTo": replyingTo
    }
    if (isNaN(parentId) || parentId === 0) {
      setComments(oldComments => [...oldComments, newComment])
      return
    }
    setComments(oldComments => oldComments.map(comment => {
      if (comment.id === parentId) {
        comment['replies'].push(newComment)
      }
      return comment
    }))
  }

  function deleteComment(commentId, parentId) {
    if (parentId === 0) {
      setComments(oldComments => oldComments.filter(comment => comment.id !== commentId))
    } else {
      setComments(oldComments => oldComments.filter(comment => {
        if (comment.id === parentId) {
          comment['replies'] = comment['replies'].filter(reply => reply.id !== commentId)
        }
        return comment
      }))
    }
  }

  return (
    <Context.Provider value={{ currentUser, comments, addNewComment, deleteComment }}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider