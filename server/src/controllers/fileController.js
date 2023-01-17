export const upload = (req, res, next) => {
    try {
        res.json({
            url: `/uploads/${req.file.originalname}`,
        })
    } catch (err) {
        next(
          res.status(500).json({
              message: 'error: ' + err
          })
        )
    }
}
