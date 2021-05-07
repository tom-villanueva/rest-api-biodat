export default class ZurichStrategy implements Strategy {

  async doParse (filePath: string, measurer: any) : Promise<any[]> {
      const parse = require('csv-parse');
      const fs = require('fs');
      const math = require('mathjs');

      const resultado : any[] = []
      //columnas a utilizar
      let complex;
      const fr = String(0);
      const modulus = String(8) 
      const phase = String(9)

      //opciones del parseador de csv
      const parser = parse({ 
          delimiter: ',',
          trim: true,
          cast: true,
          from_line: 1,
          skip_lines_with_error: true,
      })
      
      return new Promise(resolve => {
          fs.createReadStream(filePath)
          .pipe(parser)
          .on('data', (datos) => { //resultado.push(datos))
                console.log(datos);
                try {
                    complex = math.Complex.fromPolar(datos[modulus], datos[phase]);
                    resultado.push({
                        fr: Number(datos[fr]),
                        x: complex.re,
                        y: complex.im*-1,                             
                    })
                } catch (error) {
                    console.log("ERROR EN UN NUMERO ", error)
                }             
                })
          .on('end', () => resolve(resultado))
          .on('error', (error) => console.log(error.toString()))
      })
  }
}