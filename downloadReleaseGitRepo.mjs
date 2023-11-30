// import dotenv from 'dotenv';
// dotenv.config();
// import path from 'path';
// import fs from 'fs';
// import axios from 'axios';

// //const githubReleaseURL = "https://github.com/SravaniBanala/Scalable-Library-Management-System/archive/refs/heads/main.zip";

// async function downloadReleaseGitRepo(submissionURL, destination) {
//   try {
//     const githubReleaseURL = submissionURL;
//     console.log("i am the url here", submissionURL,);

//     // console.log("i am the url here",githubReleaseURL )
//     const response = await axios.get(githubReleaseURL, { responseType: 'arraybuffer' });
    
//    // const __filename = new URL(import.meta.url).pathname;
//    // const __dirname = path.dirname(__filename);

//     const zipFilePath = path.join('/tmp', `${destination}.zip`);
//     console.log('File written to local disk:', zipFilePath);
//     fs.writeFileSync(zipFilePath, Buffer.from(response.data));
//     console.log('Repository cloned and zipped successfully.');

//   } catch (error) {
//     console.error('Error downloading repository:');
//     throw error;
//   }
// }

// export default downloadReleaseGitRepo;

// const axios = require('axios');
// const fs = require('fs');
// const path = require('path');
// const { promisify } = require('util');
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);

async function downloadReleaseGitRepo(submissionURL, destination) {
  try {
    // Make a request to the GitHub release URL to get the ZIP file
    const response = await axios.get(submissionURL, { responseType: 'arraybuffer' });

    // Write the ZIP file to the destination folder
    const filePath = path.join('/tmp', 'downloaded.zip');
    await writeFileAsync(filePath, Buffer.from(response.data));

    console.log('ZIP file downloaded successfully.');

    // Now you can perform further operations with the downloaded file if needed.
    // For example, you can extract its contents using a library like 'adm-zip'.

    return filePath;
  } catch (error) {
    console.error('Error downloading ZIP file:', error);
    throw error;
  }
}
export default downloadReleaseGitRepo;
