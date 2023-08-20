import React, { useState } from 'react'
import { BsBookmark } from 'react-icons/bs'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { LiaEllipsisVSolid } from 'react-icons/lia'
import { TfiHeart } from 'react-icons/tfi'
import { FcLike } from 'react-icons/fc'
import { CiEdit } from 'react-icons/ci'
import { RiDeleteBinLine } from 'react-icons/ri'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const PostsCard = ({ post }) => {
    const [openEditAndDelete, setOpenEditAndDelete] = useState(false)
    const [bookmark, setBookMark] = useState(false)
    const singleboard = useSelector(state => state.singleboard)
    const { boardId } = useParams()
    const dispatch = useDispatch()

    const editPost = () => {
        setOpenEditAndDelete(false)
        dispatch({ type: 'openPostsForm', payload: true })
        dispatch({ type: 'editpost', payload: true })
        dispatch({ type: 'singlepost', payload: post })
    }

    const deletePost = () => {
        setOpenEditAndDelete(false)
        const updatedPostsAfterDeletion = singleboard.posts.filter(everyPost => everyPost.id !== post.id)
        const updatedBoard = {...singleboard, posts: updatedPostsAfterDeletion}
        axios.put(`https://toddle-json-server.onrender.com/boards/${boardId}`, updatedBoard)
        .then(() => dispatch({ type: 'reloadpostspage' }))
        .catch((err) => console.log(err))
    }

    const likePost = () => {
        const allPosts = []

        singleboard.posts.forEach(everyPost => {
            if(everyPost.id == post.id) {
                const postAfterLiking = {...everyPost, isLiked: !everyPost.isLiked}
                allPosts.push(postAfterLiking)
            }
            else {
                allPosts.push(everyPost)
            }
        })
        
        const updatedPosts = { ...singleboard, posts: allPosts }

        axios.put(`https://toddle-json-server.onrender.com/boards/${boardId}`, updatedPosts)
        .then(() => dispatch({ type: 'reloadpostspage' }))
        .catch((err) => console.log(err))
    }


    return (
        <div className='bg-white border-2 border-gray-300 rounded-lg px-5 py-5 h-fit w-[275px] relative'>
            <div className='flex justify-between mb-1'>
                <h1 className='text-2xl font-bold'>{post.subject}</h1>
                <div className='flex items-center gap-6'>
                    {bookmark ? <BsFillBookmarkFill className='cursor-pointer' onClick={() => setBookMark(false)}/> : <BsBookmark className='cursor-pointer' onClick={() => setBookMark(true)}/>}
                    <LiaEllipsisVSolid className='text-xl cursor-pointer' onMouseEnter={() => setOpenEditAndDelete(true)} onMouseLeave={() => setOpenEditAndDelete(false)} />
                </div>
            </div>

            <div className='mb-3'>{post.date}</div>

            <div className='h-[130px] w-fit'>
                <img src={post.image} alt='postimage' height={130} className='w-full rounded-md'/>
            </div>

            <div className='mt-8 mb-7'>{post.description}</div>

            <div className='border-[1px]'></div>

            <div className='mt-3 flex items-center gap-2'>
                { post.isLiked ? <FcLike className='cursor-pointer text-lg' onClick={likePost}/> :<TfiHeart className='cursor-pointer' onClick={likePost}/>}
                { post.isLiked ? 1 : 0}
            </div>

            {
                openEditAndDelete 
                ? <div className={`border-2 rounded-lg w-fit py-4 px-7 shadow-lg absolute z-10 left-[242px] top-10 bg-white ${openEditAndDelete ? 'block' : 'hidden'}`} onMouseEnter={() => setOpenEditAndDelete(true)} onMouseLeave={() => setOpenEditAndDelete(false)}>
                    <div className='flex items-center gap-3 text-gray-600 cursor-pointer' onClick={editPost}>
                        <CiEdit className='text-3xl' />
                        <h1 className='text-lg'>Edit</h1>
                    </div>

                    <div className='flex items-center gap-4 text-red-500 cursor-pointer mt-5' onClick={deletePost}>
                        <RiDeleteBinLine className='text-2xl' />
                        <h1 className='text-lg'>Delete</h1>
                    </div>
                  </div> 
                : ''
            }
        </div>
    )
}

export default PostsCard