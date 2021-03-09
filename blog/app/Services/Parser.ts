import SolartronStrategy from 'App/Services/SolartronStrategy'

export default class Parser {
    private strategy: Strategy;
    
    constructor(measurer: string) {
        switch(measurer) {
            case 'Solartron':
                this.strategy = new SolartronStrategy();        
            break;
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