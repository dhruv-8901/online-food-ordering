import mime from "mime";
import { v4 as uuidv4 } from "uuid";
import { existsSync, mkdirSync, writeFileSync, unlinkSync } from "fs";
import UnprocessableException from "../exception/unprocessable.exception";

class FileHelper {
  /**
   * upload file
   * @param {string} dir
   * @param {array} buffer
   * @param {string} mimetype
   * @returns
   */
  static async uploadFile(dir, buffer, mimetype) {
    const storageDir = "public";
    const fileName = `${dir}/${uuidv4()}.${mime.getExtension(mimetype)}`;

    const storageDirExists = existsSync(storageDir);
    if (!storageDirExists) mkdirSync(storageDir);

    const exists = existsSync(`${storageDir}/${dir}`);
    if (!exists) mkdirSync(`${storageDir}/${dir}`);

    writeFileSync(`${storageDir}/${fileName}`, buffer);

    return fileName;
  }

  /**
   * delete file
   * @param {string} file
   * @returns
   */
  static async deleteFile(file) {
    const path = `./public/${file}`;
    if (existsSync(path)) {
      unlinkSync(path);
    }
    return true;
  }

  /**
   * check image mime type
   * @param {object} file
   * @param {array} mimeTypes
   */
  static async checkMimeType(file, mimeTypes, filedName = null) {
    const mimetype = mimeTypes.find((mimetype) => mimetype === file.mimetype);
    if (!mimetype) {
      if (filedName !== null) {
        throw new UnprocessableException(
          `ValidationError: You have uploaded an invalid image file type in ${filedName}.`
        );
      } else {
        throw new UnprocessableException(
          "ValidationError: You have uploaded an invalid image file type."
        );
      }
    }
    return true;
  }
}

export default FileHelper;
