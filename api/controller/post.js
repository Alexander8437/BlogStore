import { db } from "../db.js"

export const getPosts = (req, res) => {
    const q = req.query.cat ?
        "SELECT * FROM blogs.blogworld Where cat=?" :
        "SELECT * FROM blogs.blogworld"

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.send(err);

        return res.status(200).json(data)
    })
}

export const getPost = (req, res) => {
    const q = "SELECT p.id, `username`, `title`, `des`, p.image, u.img AS userImg, `cat`, `date` FROM blogs.users u JOIN blogs.blogworld p ON u.id = p.uid WHERE p.id = ?"

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data[0])
    })
}

export const addPost = (req, res) => {

    const q = "INSERT INTO blogs.blogworld (`title`, `des`, `cat`, `image`, `date`, `uid`) VALUES (?)"

    const value = [
        req.body.title,
        req.body.des,
        req.body.cat,
        req.body.image,
        req.body.date,
        req.body.uid
    ]

    db.query(q, [value], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.json("Post has been added.")
    })

}

export const deletePost = (req, res) => {
    
    const postId = req.params.id
    const q = "DELETE FROM blogs.blogworld WHERE `id` = ?"

    db.query(q, [postId], (err, data) => {
        if (err) return res.status(403).json("You can't delete this post.")
        return res.json("Post has been delete.")
    })
}

export const updatePost = (req, res) => {
    const postId = req.params.id;
    const q = "UPDATE blogs.blogworld SET `title`=?,`des`=?,`image`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.des, req.body.image, req.body.cat];

    db.query(q, [...values, postId, req.body.uid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
}