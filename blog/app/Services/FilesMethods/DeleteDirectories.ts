export default function deleteDirectories (dirPath: string) {
  const fs = require('fs');

  fs.access(dirPath, fs.constants.F_OK, (err) => {
    if(err){
      console.log(`${dirPath} ${err ? 'no existe' : 'existe'}`);
    }
    else {
      fs.rmdir(dirPath, { recursive: true }, (err) => {
        if (err) {
          console.error("Algo anduvo mal en la eliminacion de directorio de item ",err)
        }
      });
    }
  });
}
