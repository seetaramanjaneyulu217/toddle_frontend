import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsPlusLg } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import { BsBookmark } from 'react-icons/bs'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { IoIosArrowRoundBack } from 'react-icons/io'
import toddle_icon from '../assets/toddle_icon.png'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const heading = useSelector(state => state.heading)
  const boards = useSelector(state => state.allboards)
  const postsPage = useSelector(state => state.postsPage)
  const allposts = useSelector(state => state.allposts)
  const [boardquery, setBoardQuery] = useState("")
  const [postquery, setPostsQuery] = useState("")
  const [bookmarks, setBookMarks] = useState(false)
  const [openPostsSearch, setOpenPostsSearch] = useState(false)
  let boardsTimer
  let postsTimer

  const postsSearch = (e) => {
    setPostsQuery(e.target.value)
    clearInterval(postsTimer)
    postsTimer = setTimeout(deBounceForPosts, 600);
  }

  const boardsSearchHandler = (e) => {
    setBoardQuery(e.target.value)
    clearInterval(boardsTimer)
    boardsTimer = setTimeout(deBounceForBoards, 600);
  }

  const deBounceForBoards = () => {
    const results = boards.filter(board => 
        board.boardName.toLowerCase().includes(boardquery)
    )

    dispatch({ type: 'boardssearch', payload: results})
  }

  const deBounceForPosts = () => {
    const results = allposts.filter(post => 
        post.subject.toLowerCase().includes(postquery)
    )

    dispatch({ type: 'postssearchresults', payload: results })
  }

  return (
    <div className='px-5 pt-6 pb-3 md:px-16 flex justify-between items-center'>
      <div className='flex gap-3 items-center'>
        { heading === 'toddle' ? '' : <IoIosArrowRoundBack className='text-3xl cursor-pointer' onClick={() => navigate('/')}/>}
        <img src={toddle_icon} alt='logo' height={50} width={50} />
        <h1 className={`text-2xl ${heading !== 'toddle' ? 'font-bold' : ''}`}>{heading}</h1>
      </div>

      {
        postsPage
          ? <div className='flex items-center gap-7'>
            { openPostsSearch ? <input type='text' placeholder='Serach posts...' onChange={postsSearch} className='border-2 rounded-md p-2'/> : <BsSearch className='text-xl cursor-pointer' onClick={() => setOpenPostsSearch(true)}/>}
            {bookmarks ? <BsFillBookmarkFill className='text-xl cursor-pointer' onClick={() => setBookMarks(false)} /> : <BsBookmark className='text-xl cursor-pointer' onClick={() => setBookMarks(true)} />}
          </div>
          : <div className='flex gap-14'>
              <input type='text' placeholder='Search...' className='border-2 border-gray-200 rounded-lg pl-3 px-11' onChange={boardsSearchHandler}/>
              <div className='flex items-center gap-2 cursor-pointer border-2 px-4 py-2 rounded-lg text-white bg-[#f75961] border-[#f75961]' onClick={() => dispatch({ type: 'openBoardForm', payload: true })}>
                <BsPlusLg className='text-2xl' />
                <button>Create new board</button>
              </div>
            </div>
      }
    </div>
  )
}

export default Header