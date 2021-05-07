export default function deleteFiles (filesPath: any[]) {
  const fs = require('fs');

  for(let filePath in filesPath) {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if(err){
        console.log(`${filePath} ${err ? 'no existe' : 'existe'}`);
      }
      else {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Algo anduvo mal en la eliminacion de archivos ",err)
          }
        })
      }
    });
  }
}
