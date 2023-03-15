import { writeImageToDisk } from "~~/js/diskUtil"

export default defineEventHandler(async (event) => {
  console.log(event);
  let bytesRead;
  let filename;
  if (event.node.req.method === 'POST') {  
    let bytes = await readRawBody(event, false);
    filename = writeImageToDisk(bytes, 'jpg', "D:/tues/thesis/thesis-frontend/assets/wiglobe/images/users/background-pictures");
    bytesRead = bytes?.byteLength
  }
  return filename
})