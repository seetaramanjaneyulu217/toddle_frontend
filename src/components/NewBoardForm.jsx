import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { colors } from './colorPalettesData'
import axios from 'axios'

const NewBoardForm = () => {

    const dispatch = useDispatch()
    const openboardeditform = useSelector(state => state.openboardeditform)
    const boarddetails = useSelector(state => state.boarddetails)
    
    const [boardData, setBoardData] = useState({
        boardName: '',
        posts: [],
        color: "#000000"
    })

    const [editData, setEditData] = useState({
        boardName: boarddetails.boardName,
        posts: boarddetails.posts,
        color: boarddetails.color
    })

    const createNewBoard = () => {
        axios.post('https://toddle-json-server.onrender.com/boards', boardData)
        .then(response => {
            dispatch({ type: 'boardchange' })
            dispatch({type:'openboardeditform', payload: false})
        })
    }

    const editBoard = () => {
        axios.put(`https://toddle-json-server.onrender.com/boards/${boarddetails.id}`, editData)
        .then(response => {
            dispatch({ type: 'boardchange' })
            dispatch({type:'openboardeditform', payload: false})
        })
    }

    return (
        <div className='flex flex-col justify-center border-2 rounded-lg w-[420px] px-5 py-3 ml-[600px] absolute top-44 bg-white'>
            <div className='flex justify-between items-center gap-10'>
                <h1 className='text-xl font-bold'>Add a name for your board</h1>
                <RxCross1 className='text-lg cursor-pointer' onClick={() => { dispatch({ type: 'openBoardForm', payload: false })
                                                                              dispatch({type:'openboardeditform', payload: false})}} />
            </div>

            <input type='text' defaultValue={openboardeditform ? boarddetails.boardName : ''} placeholder='Enter the name of board' className='border-2 border-gray-400 rounded-lg pl-3 p-3 mt-5 w-full' onChange={(e) => {openboardeditform ? setEditData({...editData, boardName: e.target.value}) : setBoardData({...boardData, boardName: e.target.value})}}/>

            <div className='mt-10'>
                <h1 className='text-xl font-bold'>Select post colour</h1>
                <h1 className='text-sm'>Here are some templates to help youget started</h1>
                <div className='flex gap-3 mb-6'>
                    {
                        colors.map(color => {
                            return (
                                <div key={color.id} className={`mt-5 rounded-full w-6 h-6 border-2`} style={{ backgroundColor: color.palette, borderColor: color.palette }} onClick={() => { openboardeditform ? setEditData({...editData, color: color.palette}) : setBoardData({...boardData, color: color.palette})}}></div>
                            )
                        })
                    }
                </div>

                {/* <div className='flex font-semibold gap-3'>Selected Color: {openboardeditform ? editData === '' : boardData.color === "#000000" ? <div className='rounded-full w-6 h-6' style={{backgroundColor: openboardeditform ? editData.color : 'black', borderColor:openboardeditform ? editData.color :'black'}}></div> : <div className={`rounded-full w-6 h-6 border-2`} style={{ backgroundColor: openboardeditform ? editData.color : boardData.color, borderColor: openboardeditform ? editData.color : boardData.color }}></div>}</div> */}
            </div>

            {
                openboardeditform 
                ? <div className='flex justify-end mt-12 mb-3' onClick={editBoard}>
                    <button className='text-white border-2 bg-[#f75961] border-[#f75961] p-2 rounded-lg' onClick={() => dispatch({ type: 'openBoardForm', payload: false })}>Edit board</button>
                  </div>
                : <div className='flex justify-end mt-12 mb-3' onClick={createNewBoard}>
                    <button className='text-white border-2 bg-[#f75961] border-[#f75961] p-2 rounded-lg' onClick={() => dispatch({ type: 'openBoardForm', payload: false })}>Create board</button>
                  </div>
            }
        </div>
    )
}

export default NewBoardForm