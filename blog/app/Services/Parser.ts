import SolartronStrategy from 'App/Services/ParserStrategies'

export default class Parser {
    private strategy: Strategy;
    
    constructor(measurer: string) {
        if(measurer === 'Solartron'){
            this.strategy = new SolartronStrategy();        
        }
    }

    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    public async parse(filePath: string) {
        const parsedData = await this.strategy.doParse(filePath);
        return parsedData;
    }
}