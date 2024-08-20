// create the token and add in cookies 

const sendToken = (user,statusCode,res)=>{

    const token = user.getJWTToken();

    // options for cookies

    const options= {
        expries:new Date(
            Date.now + process.env.COOKIE_EXPIRE * 25 *60 *60
        ),
        httponly:true,
    }

    res.status(statusCode).cookie("token",token,options).json({
        sucess:true,
        user,
        token
    })
}

module.exports = sendToken;
