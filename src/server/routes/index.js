import express from 'express';
import account from './account';

const router = express.Router();
router.use('/account', account);
router.get( '/test', ( req, res ) => {console.log('sssssssssss'); } );

export default router;
