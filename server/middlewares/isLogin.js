const jwt = require('jsonwebtoken')

const isLogin = (req, res, next) => {
  let access_token = req.headers.access_token

  if (access_token) {
    let decoded = jwt.verify(access_token, process.env.JWT_HASH)
    if (decoded) {
      req.decoded = decoded
      next()
    } else {
      res.status(500).json({
        success: false,
        message: 'something wrong with your token'
      })
    }
  } else {
    res.status(500).json({
      success: false,
      message: 'you need to login first'
    })
  }
}

module.exports = isLogin