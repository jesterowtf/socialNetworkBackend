class UploadController {
  async upload(req, res) {
    try {

      res.json({
        url: `/static/${req.file.originalname}`
      })

    } catch (e) {
      res.status(500).json(e)
    }
  }
}


export default new UploadController()