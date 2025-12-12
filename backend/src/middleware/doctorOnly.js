const doctorOnly = (req,res,next) => {
  if(req.user.role !== "doctor") {
    return res.status(403).json({
      success: false,
      message: "Accedd Denied! Only Doctors can access this route!"
    });
  }
  next();
}

export default doctorOnly;