export function errorHandler(err, req, res, next){

    err.statusCode=err.statusCode || 500
    err.message=err.message || (err.statusCode<=400? 'Internal Server Error':'Bad Request')
    err.status=err.statusCode>=400? 'Server Error': 'User Failure'
    res.status(err.statusCode).json({data: {
      message: err.message,
      status: err.status
    }})
    console.log(err)
    next()
  }