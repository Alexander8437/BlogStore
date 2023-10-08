import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';

const Menu = ({ cat }) => {
    const [posts, setPosts] = useState([])

    const location = useLocation()
    const postId = parseInt(location.pathname.split("/")[2])

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`https://blog-store-frontend.vercel.app/api/posts/?cat=${cat}`)
                setPosts(res.data)
            }
            catch (err) {
                console.log(err)
            }
        };
        fetchBlog();
    }, [cat]);

    return (
        <div className='menu'>
            <h1>Other Post you may like</h1>
            {posts.filter(post => post.id !== postId ).map(post =>
            (
                <div className="posts" key={post.id}>
                    <div className="image">
                        <img src={`../uploads/${post.image}`} alt="" />
                    </div>
                    <h2>
                        <Link className='links' to={`/post/${post.id}`}>{post.title}
                        </Link>
                    </h2>
                    <button>
                        <Link className='link' to={`/post/${post.id}`}>
                            Read More...
                        </Link>
                    </button>
                    <hr />
                </div>)
            )
            }
        </div>
    )
}

export default Menu