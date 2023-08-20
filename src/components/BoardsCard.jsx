import React, { useEffect, useState } from 'react'
import { LiaEllipsisVSolid } from 'react-icons/lia'
import { CiEdit } from 'react-icons/ci'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const BoardsCard = ({ board }) => {

    const [openEditAndDelete, setOpenEditAndDelete] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const boardsHandler = () => {
        dispatch({ type: 'postspage', payload: true })
        navigate(`/posts/${board.id}`)
    }

    const editBoard = (e) => {
        e.stopPropagation()
        setOpenEditAndDelete(false)
        dispatch({ type: 'openboardeditform', payload: true })
        dispatch({ type: 'boarddetails', payload: board })
        dispatch({ type: 'openBoardForm', payload: true })
    }

    const deleteBoard = (e) => {
        e.stopPropagation()
        setOpenEditAndDelete(false)

        axios.delete(`https://toddle-json-server.onrender.com/boards/${board.id}`)
            .then(response => {
                dispatch({ type: 'boardchange' })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <div className='border rounded-lg pr-3 w-auto h-[75px] flex items-center justify-between relative cursor-pointer' onClick={boardsHandler}>
                <div className={`border h-[75px] w-16 rounded-tl-lg rounded-bl-lg`} style={{ backgroundColor: board.color }}></div>
                <h1 className='text-md'>{board.boardName}</h1>
                <LiaEllipsisVSolid className='text-xl' onMouseEnter={(e) => {
                    e.stopPropagation()
                    setOpenEditAndDelete(true)
                }} onMouseLeave={(e) => {
                    e.stopPropagation()
                    setOpenEditAndDelete(false)
                }}/>


                <div className={`border-2 rounded-lg w-fit py-4 px-7 shadow-lg absolute z-10 left-[300px] top-11 bg-white ${openEditAndDelete ? 'block' : 'hidden'}`} onMouseEnter={() => setOpenEditAndDelete(true)} onMouseLeave={() => setOpenEditAndDelete(false)}>
                    <div className='flex items-center gap-3 text-gray-600 cursor-pointer' onClick={editBoard}>
                        <CiEdit className='text-3xl' />
                        <h1 className='text-lg'>Edit</h1>
                    </div>

                    <div className='flex items-center gap-4 text-red-500 cursor-pointer mt-5' onClick={deleteBoard}>
                        <RiDeleteBinLine className='text-2xl' />
                        <h1 className='text-lg'>Delete</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BoardsCard