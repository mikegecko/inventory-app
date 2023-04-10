
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