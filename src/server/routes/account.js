import express from 'express';
import Account from '../models/account';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({sessionID: req.sessionID, session: req.session});
    console.log(sessionID);
});

router.post('/signup', (req, res) => {
    // CHECK USERNAME FORMAT
    let useridRegex = /^[a-z0-9]+$/;

    if(!useridRegex.test(req.body.userid)) {
        return res.status(400).json({
            error: "ID error",
            code: 1
        });
    }

    // CHECK PASS LENGTH
    if(req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: "PW error",
            code: 2
        });
    }

    // CHECK USER EXISTANCE
    Account.findOne({ userid : req.body.userid }, (err, exists) => {

        if (err) throw err;
        if(exists){
            return res.status(409).json({
                error: "Please one more",
                code: 3
            });

        }

        // CREATE ACCOUNT
        let account = new Account({
            userid: req.body.userid,
            password: req.body.password
        });

        account.password = account.generateHash(account.password);

        // SAVE IN THE DATABASE
        account.save( err => {
            if(err) throw err;
            return res.json({ success: true });
        });

    });
});

router.post('/signin', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed     res.setHeader('Access-Control-Allow-Credentials', true);

    if(typeof req.body.password !== "string") {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    // FIND THE USER BY USERNAME
    Account.findOne({ userid: req.body.userid}, (err, account) => {
        if(err) throw err;

        // CHECK ACCOUNT EXISTANCY
        if(!account) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // CHECK WHETHER THE PASSWORD IS VALID
        if(!account.validateHash(req.body.password)) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // ALTER SESSION
        let session = req.session;
        let test = req.body;

        session = {
            _id: account._id,
            userid: account.userid
        };
        console.log(req.session);

        // RETURN SUCCESS
        return res.json({
            success: true
        });
    });
});

router.get('/getinfo', (req, res) => {
    if(typeof req.session === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }

    res.json({ info: req.session });
});

router.post('/logout', (req, res) => {
    req.session = null;
    // req.session.destroy(err => { if(err) throw err; });
    return res.json({ sucess: true });
});

export default router;
