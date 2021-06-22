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

		const calculatePhase = (re: number, im: number): number => {
			let res: number = math.atan2(re, im);

			if (im < 0) {
				res = res + (2*math.pi);
			}

			return res;
		}

		return new Promise(resolve => {
			fs.createReadStream(filePath)
			.pipe(parser)
			.on('data', (datos) => { //resultado.push(datos))
					let re = datos[real]/180*math.pi;
					let im = datos[imaginario]/180*math.pi;
					resultado.push({
						fr: Number(datos[fr]),
						x: Number(re),
						y: Number(im),      
						m: math.norm(math.complex(re, im)),
						f: calculatePhase(re, im)//math.atan2(re, im)                         
					})})
			.on('end', () => resolve(resultado))
			.on('error', (error) => console.log(error.toString()))
		})
  }
}