import React, { useEffect, useState } from 'react'
import { BoardsCard, Header, NewBoardForm } from '../components/exports'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const BoardsDisplay = () => {

  const dispatch = useDispatch()
  const openBoardForm = useSelector(state => state.openBoardForm)
  const boardchange = useSelector(state => state.boardchange)
  const boardsSearchResults = useSelector(state => state.boardsSearchResults)
  const [boards, setBoards] = useState([])

  const getBoards = () => {
    axios.get('https://toddle-json-server.onrender.com/boards')
    .then(result => {
       setBoards(result.data)
       dispatch({ type:'allboards', payload: result.data })
    })
  }

  useEffect(() => {
    dispatch({ type:'postspage', payload: false})
    dispatch({ type: 'boardheading', payload: 'toddle' })
    getBoards()
  },[boardchange])

  return (
    <>
      <div className={`${openBoardForm ? 'blur-md' : ''}`}>
        <Header />
        <div className='border-[1px]'></div>

        <h1 className='text-4xl font-bold px-16 pt-12'>My boards</h1>
        <div className='pt-10 px-16 grid grid-cols-1 md:grid-cols-4 gap-10'>
           {
              boardsSearchResults.length === 0
              ? boards.map(board => {
                return(
                  <BoardsCard key={board.id} board={board}/>
                )
              })

              : boardsSearchResults.map(board => {
                return(
                  <BoardsCard key={board.id} board={board}/>
                )
              })
           }
        </div>
      </div>

      {openBoardForm ? <NewBoardForm /> : ''}
    </>
  )
}

export default BoardsDisplay