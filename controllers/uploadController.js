class UploadController {
  async upload(req, res) {
    try {
      console.log(req.body);

      res.json({
        url: `/static/files/postimages/${req.file.originalname}`
      })

    } catch (e) {
      res.status(500).json(e)
    }
  }
}


export default new UploadController()