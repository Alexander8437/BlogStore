import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import moment from 'moment'

const Home = () => {
    const [posts, setPosts] = useState([])

    const cat = useLocation().search

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`https://blog-store-frontend.vercel.app/api/posts${cat}`)
                setPosts(res.data.reverse())
            }
            catch (err) {
                console.log(err)
            }
        };
        fetchBlog();
    }, [cat]);

    return (
        <div className="home">
            <div className="posts">
                {posts.length !== 0 ? (posts.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`../uploads/${post.image}`} alt="" />
                        </div>
                        <div className="content">
                            <h1>
                                <Link className='link' to={`/post/${post.id}`}>
                                    {post.title}
                                </Link>
                            </h1>
                            <span>{moment(post.date).fromNow()}</span>
                            <p>{post.des.length > 300 ? post.des.substring(0, 300) + "...." : post.des}</p>
                            {post.des.length > 200 ? <Link className='link' to={`/post/${post.id}`}>
                                <button>Read more..</button>
                            </Link> :
                                ""
                            }</div>
                    </div>
                ))) : <p className='blankData'>No Data Found</p>}
            </div>
        </div>
    )
}
export default Home
