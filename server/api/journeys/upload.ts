import { writeImageToDisk } from "~~/js/diskUtil"

export default defineEventHandler(async (event) => {
  let journeyName, imageType
  let bytesRead;
  let filename;
  if (event.node.req.method === 'POST') {  
    let bytes = await readRawBody(event, false);
    filename = writeImageToDisk(bytes, 'jpg', "C:/Users/irina/OneDrive/Desktop/WiGlobe/wiglobe-frontend/assets/wiglobe/images/journeys/");
    bytesRead = bytes?.byteLength
  }
  return filename
})