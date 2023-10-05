import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import moment from 'moment'
import Menu from '../components/Menu'
import axios from 'axios'

const Single = () => {

  const [post, setPost] = useState({})

  const location = useLocation()
  const navigate = useNavigate()

  const postId = location.pathname.split("/")[2]

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8801/api/posts/${postId}`)
        setPost(res.data)
      }
      catch (err) {
        console.log(err)
      }
    };
    fetchBlog();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8801/api/posts/${postId}`)
      navigate("/")
    }
    catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="single">
      <div className="content">
        {post.image ? <div className="singleImg">
          <img src={`../uploads/${post.image}`} alt=''></img>
        </div>
          :
          ""}
        <div className="imagebottom">
          <div className="user">
            <img src={post.userImg}></img>
            <div className="info">
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
          </div>
          {currentUser.username === post.username && <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
              <button className='EditButton'>Edit</button>
            </Link>
            <Link to='/' >
              <button className='DeleteButton' onClick={handleDelete}>Delete</button>
            </Link>
          </div>}
        </div>
        <h1>{post.title}</h1>
        {post.des}
      </div>
      <Menu cat={post.cat} />
    </div>
  )
}

export default Single