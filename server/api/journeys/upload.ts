import fs from "fs"; 

export default defineEventHandler(async (event) => {
  let journeyName = event.context.params?.journey
  
  if (event.node.req.method === 'POST') {
    let folderName = "D:/tues/thesis/thesis-frontend/wiglobe/images/"
    // if (!fs.existsSync(folderName)){
    //     fs.mkdirSync(folderName)
    // }
    console.log(folderName + generateUUID() + ".JPG")

    fs.writeFile(folderName + generateUUID() + ".jpg", event.node.req.read(), 'binary', (err) => {
      // In case of an error throw err.
      if (err) throw err
    })
  }
  //if error is thrown, it will not be accessible here, since writeFile is asynchronous
  return "ok"
})

function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){
        //Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {
        //Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}