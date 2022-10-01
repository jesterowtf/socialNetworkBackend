import * as uuid from 'uuid';
import * as path from 'path';

class fileService {
  upload(file) {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve('static/files/avatars', fileName)
      file.mv(filePath); // file move to path
      return fileName;
    } catch (e) {
      console.log(e);
    }
  }

  saveFile(file) {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve('static/files/avatars', fileName)
      file.mv(filePath); // file move to path
      return fileName;
    } catch (e) {
      console.log(e);
    }
  }
  saveImagePost(file) {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve('static/files/postimages', fileName)
      file.mv(filePath); // file move to path
      return fileName;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new fileService()