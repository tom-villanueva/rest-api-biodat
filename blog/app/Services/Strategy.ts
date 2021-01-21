interface Strategy {
    doParse(filePath: string):  Promise<any[]>
}