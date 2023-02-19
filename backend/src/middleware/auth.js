import jwt from 'jsonwebtoken'
import models from '../models'
 const isLoggedIn = async (req, res, next) => {
    try{
        if(!req.headers.authorization){
            return res.status(400).json({message:'لم يتم توفير رمز الدخول'})       
        
        }
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        req.currentUser = decoded
        next()
    }
    catch(err){
        res.status(500).json(err.message)
    }
 }
 export default isLoggedIn