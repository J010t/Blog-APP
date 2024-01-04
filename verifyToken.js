import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json('you are not authenticated');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, data)=>{
        if(err){
            return res.status(403).json('token is not valid');
        }
        req.userId=data._id;
        next();
    });
};

export default verifyToken;