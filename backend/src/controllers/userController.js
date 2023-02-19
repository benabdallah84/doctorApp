import bcrypt from 'bcryptjs'
import models from '../models'
import jwt from 'jsonwebtoken'
export const register= async(req,res,next)=>{
    const {name, email, password, userType, specialization, address, location, phone, workingHours} = req.body
    const hashpassword = await bcrypt.hash(password,10)
    try {
        const user = await models.User.create({
            name,
            email,
            password: hashpassword,
            userType,
            latitude: location.latitude, 
            longitude: location.longitude
            
        })
        if(userType === 'doctor'){
            const profile = await models.Profile.create({
                userId: user.id,
                specialization,
                address,
                workingHours,
                phone
            })

        }
        res.status(200).json({message:'لقد تمت عملية التسجيل بنجاح'})
    }catch(err) {
        res.status(500).json({message:err.message})
    }
}
export const login = async(req,res,next)=>{
    const {email, password} = req.body
    try {
        const user = await models.User.findOne({where: {email}})
        if(!user) return res.status(401).json({message:'تأكد من البريد الالكروني أو كلمة السر'})

        const authenticate = await bcrypt.compare(password, user.password)

        if(authenticate){
            const token = jwt.sign({id:user.id, name: user.name, email:user.email}, process.env.JWT_SECRET)
            res.status(200).json({accessToken: token})
        }
    }
    catch(err) {
        res.status(500).json({message:err.message})
    }
   
}
export const me = (req,res) => {
    const user = req.currentUser;
    res.json(user)
}
//get profile from the current user
export const getProfile = async(req,res,next) => {
    try {
        const user= await models.User.findOne(
            {
                where: {id:req.currentUser.id},
                include:[{model:models.Profile, as: 'profile'}],
                attributes: {exclude:['password']}
            })
            res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err.message)

    }
}