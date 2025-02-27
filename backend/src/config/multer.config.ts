/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { diskStorage } from "multer";
import { extname } from "path";
import { existsSync, mkdirSync } from "fs";

export const multerConfig = {
  storage: diskStorage({
    destination: (_req, _file, cb) => {
      const userId = _req.params.userId;
      const uploadPath = `./public/${userId}`;

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (_req, file, cb) => {
      cb(null, "avatar" + extname(file.originalname));
    },
  }),
};
