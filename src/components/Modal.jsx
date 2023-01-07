import React from 'react'

function Modal({ open, setOpenModal, onDeleteComment , commentId, parentId}) {
    if (!open) return
    return (
        <div className="overlay">
            <div className="modal">
                <h3 className="modal__title">Delete Comment</h3>
                <p className="modal__desc">Are you sure you want to delete the comment? This will remove the comment and can't be undone.</p>
                <div className="modal__btn__wrapper">
                    <button className="comment__btn modal__btn--cancel close__modal" onClick={() => setOpenModal(false)}>No, cancel</button>
                    <button className="comment__btn modal__btn--delete" onClick={() => onDeleteComment(commentId, parentId)}>Yes, Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Modal