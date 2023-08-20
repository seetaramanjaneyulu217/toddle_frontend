import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { BsPlusLg } from 'react-icons/bs'
import empty_posts from '../assets/empty_posts.svg'
import { useDispatch, useSelector } from 'react-redux'
import { NewPostsForm, PostsCard } from '../components/exports'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const PostsDisplay = () => {

    const dispatch = useDispatch()
    const { boardId } = useParams()
    const openPostsForm = useSelector(state => state.openPostsForm)
    const postssearchresults = useSelector(state => state.postssearchresults)
    const reloadpostspage = useSelector(state => state.reloadpostspage)
    const [posts, setPosts] = useState([])

    const getPosts = () => {
        axios.get('https://toddle-json-server.onrender.com/boards')
            .then(result => {
                result.data.map(board => {
                    if (boardId == board.id) {
                        setPosts(board.posts)
                        dispatch({ type: 'allposts', payload: board.posts })
                        dispatch({ type: 'singleboard', payload:board })
                        dispatch({ type: 'boardheading', payload: board.boardName })
                    }
                })
            })
    }

    
    useEffect(() => {
        dispatch({ type: 'postspage', payload: true })
        getPosts()
    }, [openPostsForm, reloadpostspage])

    console.log(posts);

    return (
        <>
            <div className={`${openPostsForm ? 'blur-lg' : ''}`}>
                <Header />
                <div className='border-[1px]'></div>

                <div className='flex justify-between px-20 pt-12 mb-12'>
                    <h1 className='text-4xl font-bold'>Your posts</h1>
                    <div className='flex items-center gap-2 cursor-pointer border-2 px-4 py-2 rounded-lg text-white bg-[#f75961] border-[#f75961]' onClick={() => dispatch({ type: 'openPostsForm', payload: true })}>
                        <BsPlusLg className='text-2xl' />
                        <button>Create new post</button>
                    </div>
                </div>

                <div className={`${posts.length !== 0 ? 'grid grid-cols-1 md:grid-cols-3' : ''} px-20`}>
                    {
                        posts.length === 0
                            ? <div className='flex flex-col mt-32'>
                                <img src={empty_posts} alt="no posts" height={210} width={210} className='m-auto' />
                                <h1 className='text-lg text-center font-bold'>No posts here yet</h1>
                                <h1 className='text-center'>Create your first post by clicking on the '+' button above</h1>
                            </div>
                            : postssearchresults.length === 0
                              ? posts.map(post => {
                                    return (
                                        <PostsCard key={post.id} post={post} />
                                    )
                                })
                              : postssearchresults.map(post => {
                                    return (
                                        <PostsCard key={post.id} post={post} />
                                    )
                                })
                    }
                </div>
            </div>

            {openPostsForm ? <NewPostsForm /> : ''}
        </>
    )
}

export default PostsDisplay