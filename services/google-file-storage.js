import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import "dotenv/config";

export const upload = multer();

const {
  GOOGLE_PROJECT_ID,
  GOOGLE_PRIVATE_KEY_ID,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_CLIENT_ID,
  GOOGLE_BUCKET_NAME
} = process.env;

const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

const storage = new Storage({
  credentials: {
    private_key_id: GOOGLE_PRIVATE_KEY_ID,
    private_key: privateKey,
    client_email: GOOGLE_CLIENT_EMAIL,
    client_id: GOOGLE_CLIENT_ID
  },
  projectId: GOOGLE_PROJECT_ID
});

const bucketName = GOOGLE_BUCKET_NAME;

export const uploadFile = async (file, folderName) => {
  const bucket = storage.bucket(bucketName);

  const fileExtension = file.originalname.split(".").pop();
  const fileName = `${folderName}/${uuidv4()}.${fileExtension}`;
  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream();

  await new Promise((resolve, reject) => {
    blobStream.on("error", (err) => reject(err));
    blobStream.on("finish", async () => {
      await blob.makePublic();
      resolve();
    });
    blobStream.end(file.buffer);
  });

  return `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(fileName)}`;
};

export const uploadFiles = async (files, folderName) => {
  const urls = await Promise.all(
    files.map(file => uploadFile(file, folderName))
  );
  return urls;
};


