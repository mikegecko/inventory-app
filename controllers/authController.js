const jwt = require('jsonwebtoken');
//Login
exports.login = (req,res,next) => {
    //Get username and password from request body
    const { username, password } = req.body;
    //Check if username/password are correct
    if(username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD){
        // If correct, create a token
        const token = jwt.sign({isAdmin: true}, process.env.JWT_SECRET, {expiresIn: '1h'} );
        res.status(200).json({success: true, token});
    }else{
        // Incorrect password or username
        res.status(401).json({success: false, message: 'Invalid username or password'});
    }
}
//Logout
exports.logout = (req,res,next) => {
    //Destroy the token
    res.status(200).json({success: true, message: 'Logout successful'});
}
//Update password
exports.update_password = (req,res,next) => {
    const { currentPassword, newPassword } = req.body;
    //Check if password is correct
    if(currentPassword !== process.env.ADMIN_PASSWORD){
        res.status(401).json({success: false, message: 'Current password is incorrect'});
        return;
    }
    //Update password
    process.env.ADMIN_PASSWORD = newPassword;
    res.status(200).json({success: true, message: 'Password updated successfully'});
}

exports.requireAuth = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return(res.status(401).json({success: false, message: 'Unauthorized'}));
    }
    //Extract the token
    const token = authHeader.split(' ')[1];

    try{
        //Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(decodedToken.isAdmin){
            //User is admin, they are authorized
            return next();
        }else{
            return(res.status(401).json({success: false, message: 'Unauthorized'}));
        }
    } catch(error){
        // Token is invalid or has expired, or request is unauthorized
        return(res.status(401).json({success: false, message: 'Unauthorized'}));
    }
}