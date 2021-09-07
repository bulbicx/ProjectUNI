module.exports = {
    paginatedResults: (model) => {
        return async (req, res, next) => {
          const page = req.query.page ? parseInt(req.query.page) : 1
          const limit = req.query.limit ? parseInt(req.query.limit) : 10
      
          const startIndex = (page - 1) * limit
          const endIndex = page * limit
      
          const results = {}
      
          if (endIndex < await model.countDocuments().exec()) {
            results.next = {
              page: page + 1,
              limit: limit
            }
          }
          
          if (startIndex > 0) {
            results.previous = {
              page: page - 1,
              limit: limit
            }
          }
          try {
            results.results = await model.find().limit(limit).skip(startIndex).exec()
            res.paginatedResults = results
            next()
          } catch (e) {
            res.status(500).json({ message: e.message })
          }
        }
      }
} 
