
import { createContext, useContext, useState } from 'react'
import data from '../data/data.json'

const Context = createContext()

const formatter = new Intl.RelativeTimeFormat(undefined, {numeric: 'auto'})
const DIVISONS = [
  { amount: 60, name: 'seconds' },
  { amount: 60, name: 'minutes' },
  { amount: 24, name: 'hours' },
  { amount: 7, name: 'days' },
  { amount: 4.34524, name: 'weeks' },
  { amount: 12, name: 'months' },
  { amount: Number.POSITIVE_INFINITY, name: 'years' }
]

export function useData() {
  return useContext(Context)
}

export function useDateFormatterToAgo(date) {
  let duration = (date - new Date()) / 1000
  for (let i = 0; i < DIVISONS.length; i++) {
    const division = DIVISONS[i]
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name)
    }
    duration /= division.amount
  }
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
      "createdAt": new Date(),
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

  function updateComment(message, commentId, parentId) {
    let replyToAt = message.split(' ')[0].toString()
    let replyingTo = message.startsWith('@') ? replyToAt.slice(1, replyToAt.length) : ''
    message = message.startsWith('@') ? message.slice(replyingTo.length + 1, message.length) : message

    if (parentId === 0) {
      setComments(oldComments => oldComments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, 'content': message, 'replyingTo': replyingTo }
        }
        return comment
      }))
      console.log(comments)
    } else {
      setComments(oldComments => oldComments.map(comment => {
        if (comment.id === parentId) {
          comment['replies'] = comment['replies'].map(reply => {
            if (reply.id === commentId) {
              return { ...reply, 'content': message, 'replyingTo': replyingTo }
            }
            return reply
          })
        }
        return comment
      }))
    }
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
    <Context.Provider value={{ currentUser, comments, addNewComment, deleteComment, updateComment }}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider