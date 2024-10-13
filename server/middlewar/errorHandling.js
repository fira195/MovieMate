export function errorHandler(err, req, res, next){

    err.statusCode=err.statusCode || 500
    err.message=err.message || 'Internal Server Error'
    err.status=err.statusCode>=400? 'Error': 'Failure'
    res.status(err.statusCode).json({data: {
      message: err.message,
      status: err.status
    }})
    console.log(err)
    next()
  }