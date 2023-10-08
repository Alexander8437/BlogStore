import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.des || '')
  const [title, setTitle] = useState(state?.title || '')
  const [file, setFile] = useState(state?.image || '')
  const [cat, setCat] = useState(state?.cat || '')

  var imgUrl;

  const navigate = useNavigate()

  const uid = JSON.parse(window.localStorage.getItem('user')).id

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file)
      const res = await axios.post("https://blog-store-frontend.vercel.app/api/upload", formData)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpload = async (e) => {
    setFile(e.target.files[0])
    // imgUrl = await upload();
  }

  const handleSubmit = async e => {
    e.preventDefault()
    imgUrl = await upload();

    // if (imgUrl === undefined) {
    //   imgUrl = file
    // }
    console.log(file)
    try {
      state ?
        await axios.put(`https://blog-store-frontend.vercel.app/api/posts/${state.id}`, {
          title,
          des: value,
          cat,
          image: imgUrl ? imgUrl : file,
          uid
        })
        :
        await axios.post(`https://blog-store-frontend.vercel.app/api/posts/`, {
          title,
          des: value,
          cat,
          image: file ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:MM:SS"),
          uid
        });
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder="Title" name='title' onChange={(e) => setTitle(e.target.value)} />
        <div className="editorContainer">
          <textarea className='editor' type='text' theme="snow" value={value} onChange={(e) => setValue(e.target.value)} name="des" placeholder='Enter Description...'>
          </textarea>
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span><b>Status: </b> Draft</span>
          <span><b>Visiblity: </b> Public</span>
          <input
            type="file"
            id="file"
            style={{ display: 'none' }} name=''
            onChange={(e) => handleUpload(e)} />
          <label className='file' htmlFor="file">Upload Image</label>

          <div className="buttons">
            <button>Save as Draft</button>
            {state ? (<button onClick={handleSubmit}>
              Update
            </button>) :
              (<button onClick={handleSubmit}>
                Publish
              </button>)}
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === 'art'} name="cat" value="art" id="art" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="art">Art</label></div>
          <div className="cat">
            <input type="radio" checked={cat === 'science'} name="cat" value="science" id="science" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="science">Science</label></div>
          <div className="cat">
            <input type="radio" checked={cat === 'technology'} name="cat" value="technology" id="technology" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="technology">Technology</label></div>
          <div className="cat">
            <input type="radio" checked={cat === 'cinema'} name="cat" value="cinema" id="cinema" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="cinema">Cinema</label></div>
          <div className="cat">
            <input type="radio" checked={cat === 'design'} name="cat" value="design" id="design" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="design">Design</label></div>
          <div className="cat">
            <input type="radio" checked={cat === 'food'} name="cat" value="food" id="food" onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="food">Food</label></div>
        </div>
      </div>
    </div>
  )
}

export default Write