import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { CiImageOn } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const NewPostsForm = () => {

  const dispatch = useDispatch()
  const { boardId } = useParams()
  const [imageUrl, setImageUrl] = useState('')
  const singleboard = useSelector(state => state.singleboard)
  const singlepost = useSelector(state => state.singlepost)
  const editpost = useSelector(state => state.editpost)
  const [image, setImage] = useState('')
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  let [postData, setPostData] = useState({
    id: singleboard.posts.length + 1,
    subject: '',
    description: '',
    date: month[new Date().getMonth()] + " " + new Date().getDate(),
    isLiked: false,
    isBookMarked: false
  })

  let [editData, setEditData] = useState({
    id:singlepost.id,
    subject: singlepost.subject,
    image: singlepost.image,
    description: singlepost.description,
    isLiked: singlepost.isLiked,
    isBookMarked: singlepost.isBookMarked
  })

  const editPostDetails = async() => {
    dispatch({ type: 'editpost', payload: false })
    dispatch({ type: 'openPostsForm', payload: false })

    const formData = new FormData()
    formData.append("file", image[0])
    formData.append("upload_preset", "rap0jfwa")
    await axios.post('https://api.cloudinary.com/v1_1/dipdggpwh/image/upload', formData)
    .then((response) => {
      editData = { ...editData, image: response.data.url }
    })
    .catch((err) => {
      console.log(err)
    })
  
    let filteredPosts = singleboard.posts.filter(post => post.id !== singlepost.id)
    filteredPosts = [...filteredPosts, editData]
    const updatedData = {...singleboard, posts: filteredPosts}
    axios.put(`https://toddle-json-server.onrender.com/boards/${boardId}`, updatedData)
    .then(() => {
      dispatch({ type: 'reloadpostspage' })
    })
    .catch((err) => console.log(err))
  }

  const publishPost = async () => {

    const formData = new FormData()
    formData.append("file", image[0])
    formData.append("upload_preset", "rap0jfwa")
    await axios.post('https://api.cloudinary.com/v1_1/dipdggpwh/image/upload', formData)
    .then((response) => {
      postData = { ...postData, image: response.data.url }
    })
    .catch((err) => {
      console.log(err)
    })


    dispatch({ type: 'openPostsForm', payload: false })
    const updatedData = { ...singleboard, posts: [...singleboard.posts, postData] }

    axios.put(`https://toddle-json-server.onrender.com/boards/${boardId}`, updatedData)
    .then(() => dispatch({ type: 'reloadpostspage' }))
  }

  return (
    <>
      <div className='flex flex-col justify-center border-2 border-gray-300 rounded-lg w-[420px] px-5 py-2 ml-[570px] absolute bottom-24 bg-white'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold'>Create a post</h1>
            <h1>Write something for your post</h1>
          </div>
          <RxCross1 className='cursor-pointer' onClick={() => { dispatch({ type: 'openPostsForm', payload: false }) 
                                                                dispatch({ type: 'editpost', payload: false })}} />
        </div>

        <div className='flex flex-col mt-8 mb-5'>
          <label className='font-semibold mb-2'>Subject</label>
          <input type='text' defaultValue={editpost ? singlepost.subject : ''} placeholder='Enter your subject here' className='p-3 border-2 boder-gray-200 rounded-lg w-96' onChange={(e) => {editpost ? setEditData({ ...editData, subject: e.target.value }) : setPostData({ ...postData, subject: e.target.value })}} />
        </div>

        <div className='mb-10'>
          <label className='flex items-center gap-2 text-lg text-gray-500 border-2 border-gray-300 rounded-md w-44 pl-1 px-2 cursor-pointer'>
            <CiImageOn className='text-xl' />
            <h1>Add your image</h1>
            <input type='file' style={{ display: 'none' }} onChange={(e) =>{editpost ? setImage(e.target.files) : setImage(e.target.files) }} />
          </label>
        </div>

        <div className='border-[1px] mb-5'></div>

        <div className='flex flex-col mt-8 mb-5'>
          <label className='font-semibold mb-2'>What's on your mind?</label>
          <input type='text' defaultValue={editpost ? singlepost.description : ''} placeholder='Enter something about it' className='p-3 border-2 boder-gray-200 rounded-lg w-96' onChange={(e) => { editpost ? setEditData({ ...editData, description: e.target.value }) : setPostData({ ...postData, description: e.target.value })}} />
        </div>

        {
           editpost 
           ? <div className='flex justify-end mt-12 mb-3'>
                <button className='text-white border-2 bg-[#f75961] border-[#f75961] p-2 px-7 rounded-lg' onClick={editPostDetails}>Edit post</button>
              </div>
            : <div className='flex justify-end mt-12 mb-3'>
                <button className='text-white border-2 bg-[#f75961] border-[#f75961] p-2 px-7 rounded-lg' onClick={publishPost}>Publish</button>
              </div>
        }
      </div>
    </>
  )
}

export default NewPostsForm