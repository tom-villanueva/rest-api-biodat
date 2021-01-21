export default class SolartronStrategy implements Strategy {

    async doParse(filePath: string) : Promise<any[]> {
        const parse = require('csv-parse');
        const fs = require('fs');

        const resultado : any[] = []
        //columnas a utilizar
        const fr = String(0);
        const real = String(4);
        const imaginario = String(5);
        //opciones del parseador de csv
        const parser = parse({ 
            delimiter: ',',
            trim: true,
            cast: true,
            from_line: 12,
            skip_lines_with_error: true,
        })
        return new Promise(resolve => {
            fs.createReadStream(filePath)
            .pipe(parser)
            .on('data', (datos) => //resultado.push(datos))
                    resultado.push({
                        fr: Number(datos[fr]),
                        real: Number(datos[real]),
                        imaginario: Number(datos[imaginario]),                             
                    }))
            .on('end', () => resolve(resultado))
            .on('error', (error) => console.log(error.toString()))
        })
    }
}