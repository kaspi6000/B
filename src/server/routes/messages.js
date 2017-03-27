import express from 'express';
import Messages from '../models/messages';

const router = express.Router();

router.get('/realchat', (req, res) =>{

    let messages  = new Messages({
        userid : req.body.userid,
        name : req.body.name,
        message : req.body.message
    });

    messages.save( err => {
        if(err) throw err;
        return res.json({ success : true });
    });
})

export default router;
