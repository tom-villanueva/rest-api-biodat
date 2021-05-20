export default class ScioSpecStrategy implements Strategy {

  async doParse (filePath: string, measurer: any) : Promise<any[]> {
      const parse = require('csv-parse');
      const fs = require('fs');
      const math = require('mathjs');

      const resultado : any[] = []
      //columnas a utilizar
      const fr = String(0);
      const real = String(1);
      const imaginario = String(2);
      //opciones del parseador de csv
      const parser = parse({ 
          delimiter: "\t",
          trim: true,
          cast: true,
          from_line: 7,
          skip_lines_with_error: true,
      })
      return new Promise(resolve => {
          fs.createReadStream(filePath)
          .pipe(parser)
          .on('data', (datos) => { //resultado.push(datos))
                console.log(datos);
                  resultado.push({
                      fr: Number(datos[fr]),
                      x: Number(datos[real]),
                      y: Number(datos[imaginario]),      
                      m: math.norm(math.complex(datos[real], datos[imaginario])),
                      f: math.atan2(datos[real], datos[imaginario])                         
                  })})
          .on('end', () => resolve(resultado))
          .on('error', (error) => console.log(error.toString()))
      })
  }
}