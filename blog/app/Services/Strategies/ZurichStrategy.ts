export default class ZurichStrategy implements Strategy {

  async doParse (filePath: string, measurer: any) : Promise<any[]> {
      const parse = require('csv-parse');
      const fs = require('fs');
      const math = require('mathjs');

      const resultado : any[] = []
      //columnas a utilizar
      let complex;
      const fr = String(0);
      const modulus = String(7) 
      const phase = String(8)

      //opciones del parseador de csv
      const parser = parse({ 
          delimiter: ',',
          trim: true,
          cast: true,
          from_line: 13,
          skip_lines_with_error: true,
      })
      
      return new Promise(resolve => {
				fs.createReadStream(filePath)
				.pipe(parser)
				.on('data', (datos) => { //resultado.push(datos))
							//console.log(datos);
					try {
						complex = math.Complex.fromPolar(datos[modulus], (datos[phase]/180*math.pi));
						resultado.push({
							fr: Number(datos[fr]),
							x: complex.re,
							y: complex.im,  
							m: datos[modulus],
							f: datos[phase]                          
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