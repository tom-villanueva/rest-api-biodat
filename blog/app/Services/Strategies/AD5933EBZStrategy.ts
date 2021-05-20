export default class AD5933EBZStrategy implements Strategy {

  async doParse (filePath: string, measurer: any) : Promise<any[]> {
      const parse = require('csv-parse');
      const fs = require('fs');
      const math = require('mathjs');

      const resultado : any[] = []
      //columnas a utilizar
      const fr = String(0);
      const real = String(5);
      const imaginario = String(6);
      let complex;
      let valorModulo;
      let valorFase;
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
          .on('data', (datos) => {//resultado.push(datos))
          //console.log(datos);
          valorModulo = datos[1]+'.'+datos[2];
          valorFase   = datos[3]+'.'+datos[4];
          complex = math.Complex.fromPolar(Number(valorModulo), Number(valorFase));
					resultado.push({
							fr: Number(datos[fr]),
							x: complex.re,
							y: complex.im,  
							m: Number(valorModulo),
							f: Number(valorFase)                          
						})
					})
          .on('end', () => resolve(resultado))
          .on('error', (error) => console.log(error.toString()))
      })
  }
}