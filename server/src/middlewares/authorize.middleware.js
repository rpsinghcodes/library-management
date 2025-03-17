import jwt from 'jsonwebtoken';


const checkRoles = (roles) => {
    return async (req, res, next) => {
        console.log('roles: ', roles);
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({message: "Please login to access this route"});
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const role = await decoded.role;
            req.userId = decoded._id;
            // console.log('user: ', user);
            if (!roles.includes(role)) {
                return res.status(401).json({message: "You are not authorized to access this route"});
            }
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json({message: "Invalid token"});
        }
    }
}


const authorize = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({message: "Please login to access this route"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded._id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "Invalid token"});
    }
}

export {checkRoles, authorize};