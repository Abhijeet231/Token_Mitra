const patientOnly = (req,res,next) => {
    if(req.user.role !== "patient"){
        return res.status(403).json({
            success: false,
            message: "Accedd Denied! Only Patient can access this route!"
        })
    }
    next();
}

export default patientOnly;