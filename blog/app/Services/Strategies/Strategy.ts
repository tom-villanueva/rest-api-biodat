interface Strategy {
    doParse(filePath: string, measurer: any):  Promise<any[]>
}