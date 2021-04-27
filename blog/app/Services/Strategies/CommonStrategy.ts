export default class CommonStrategy implements Strategy {

  async doParse (filePath: string, measurer: any) : Promise<any[]> {
      const parse = require('csv-parse');
      const fs = require('fs');
      const math = require('mathjs');

      const resultado : any[] = []

      //columnas a utilizar
      const fr = measurer.fr;
      let real = '';
      let imaginary = '';
      if(measurer.real !== null && measurer.imaginary !== null) {
        real = measurer.real;
        imaginary = measurer.imaginary;
      } 

      //opciones del parseador de csv
      const parser = parse({ 
          delimiter: measurer.delimiter,
          trim: true,
          cast: true,
          from_line: measurer.from_line,
          skip_lines_with_error: true,
      })

      if(measurer.modulus !== null && measurer.phase !== null){
        let complex;
        return new Promise(resolve => {
          fs.createReadStream(filePath)
          .pipe(parser)
          .on('data', (datos) => { //resultado.push(datos))
                  complex = math.Complex.fromPolar(datos[measurer.modulus], datos[measurer.phase]);
                  resultado.push({
                      fr: Number(datos[fr]),
                      x: complex.re,
                      y: complex.im*-1,                             
                  })})
          .on('end', () => resolve(resultado))
          .on('error', (error) => console.log(error.toString()))
        })
      }
      else {
        return new Promise(resolve => {
          fs.createReadStream(filePath)
          .pipe(parser)
          .on('data', (datos) => { //resultado.push(datos))
                  resultado.push({
                      fr: Number(datos[fr]),
                      x: Number(datos[real]),
                      y: Number(datos[imaginary]*-1),                             
                  })})
          .on('end', () => resolve(resultado))
          .on('error', (error) => console.log(error.toString()))
        })
      }
  }
}
