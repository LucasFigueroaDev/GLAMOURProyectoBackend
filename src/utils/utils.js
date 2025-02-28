import multer from "multer";
import fs from 'fs';
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const uploadPath = join(__dirname, '../../public/img');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

export const uploader = multer({ storage });