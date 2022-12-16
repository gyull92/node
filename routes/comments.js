const express = require("express");
const router = express.Router();

const Posts = require("../schemas/post");
const Comment = require("../schemas/comment");

// 코멘트 조회
router.get("/comments/:_postid", async(req,res) => {
    const {_postid} = req.params;
    console.log(_postid)
    const dbdata = await Comment.find({_postid:_postid}).sort({createdAt: -1})
    console.log(dbdata)
    res.json({data:dbdata});
});

// 코멘트 작성
router.post("/comments/:_postid", async(req,res) => {
    const {_postid} = req.params;
    const { name, password, contents } = req.body;
    await Comment.create({name, password, contents, _postid});

    res.status(200).json({"message": "댓글을 생성하였습니다."})
});

// 코멘트 수정
router.put("/comments/:commentsid", async(req,res) => {
    const {commentsid} = req.params;
    const {password, contents} = req.body
    const [edit] = await Comment.find({ _id: commentsid })
    if (edit.password === password) {
        await Comment.updateOne({ contents });
    } else {
        return res.status(400).json({"message": "비밀번호가 틀렸습니다."});
    };


    res.status(200).json({ "message": "댓글을 수정하였습니다." });
});

// 코멘트 삭제
router.delete("/comments/:commentsid", async(req,res) => {
    const {commentsid} = req.params;
    const {password} = req.body;
    const [del] = await Comment.find({ _id: commentsid });
    if (del.password === password) {
        await Comment.deleteOne({_id:commentsid})
    } else {
        return res.status(400).json({"message": "비밀번호가 틀렸습니다."})
    };

    res.status(200).json({"message": "댓글을 삭제하였습니다."});
});

module.exports = router;