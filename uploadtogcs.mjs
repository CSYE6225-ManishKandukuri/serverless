import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const projectId = process.env.PROJECTID;
const encodedKey = process.env.PRIVATEKEY;
const decodedPrivateKey = Buffer.from(encodedKey, 'base64').toString('utf-8');
const gcpAccessKey = JSON.parse(decodedPrivateKey);

const uploadToGCS = async (bucketName, localFilePath, destinationPath) => {
  try {
    const storage = new Storage({ projectId, credentials: gcpAccessKey });
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(destinationPath);

    const writeStream = file.createWriteStream({
      metadata: {
        contentType: 'application/octet-stream',
      },
      force: true,
    });

    console.log("GCP Credentials Authenticated Successfully");

    const readStream = fs.createReadStream(localFilePath);
    readStream.pipe(writeStream);

    var url;

    await new Promise((resolve, reject) => {
      writeStream.on('error', (err) => {
        console.error(`Error uploading file: ${err}`);
        reject(err);
      });

      writeStream.on('finish', async () => {
        console.log(`File Uploaded Successfully to ${bucketName}/${destinationPath}`);

        // Get signed URL for the uploaded file
        url = await file.getSignedUrl({
          action: 'read',
          expires: '03-09-2025', // Set the expiration date for the URL
        });

        console.log(`Download URL: ${url}`);
        resolve();
      });

      readStream.on('error', (err) => {
        console.error(`Error Reading File: ${err}`);
        reject(err);
      });
    });
    return [1, url];
  } catch (error) {
    console.log("Upload to GCS Failed with Error", error.message);
    return [0, null];
  }
};

export default uploadToGCS;
