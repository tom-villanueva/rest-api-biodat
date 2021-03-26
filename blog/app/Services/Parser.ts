import SolartronStrategy from 'App/Services/SolartronStrategy'

export default class Parser {
    private strategy: Strategy;
    
    constructor(measurer: string) {
        this.strategy = this.defineStrategy(measurer);
    }

    private defineStrategy(measurer: string) {
        let strategy: Strategy;
        switch(measurer) {
            case 'Solartron':
                strategy = new SolartronStrategy();        
            break;
            default:
                strategy = new SolartronStrategy();
            break;
        }
        return strategy;
    }

    public setStrategy(strategy: string) {
        this.strategy = this.defineStrategy(strategy);
    }

    public async parse(filePath: string) {
        const parsedData = await this.strategy.doParse(filePath);
        return parsedData;
    }
}