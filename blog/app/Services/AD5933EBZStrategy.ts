export default class AD5933EBZStrategy implements Strategy {

  async doParse (filePath: string) : Promise<any[]> {
      const parse = require('csv-parse');
      const fs = require('fs');

      const resultado : any[] = []
      //columnas a utilizar
      const fr = String(0);
      const real = String(3);
      const imaginario = String(4);
      //opciones del parseador de csv
      const parser = parse({ 
          delimiter: ',',
          trim: true,
          cast: true,
          from_line: 2,
          skip_lines_with_error: true,
      })
      return new Promise(resolve => {
          fs.createReadStream(filePath)
          .pipe(parser)
          .on('data', (datos) => //resultado.push(datos))
                  resultado.push({
                      fr: Number(datos[fr]),
                      x: Number(datos[real]),
                      y: Number(datos[imaginario]*-1),                             
                  }))
          .on('end', () => resolve(resultado))
          .on('error', (error) => console.log(error.toString()))
      })
  }
}