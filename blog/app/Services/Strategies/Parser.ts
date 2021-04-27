import SolartronStrategy from './SolartronStrategy'
import AD5933EBZStrategy from './AD5933EBZStrategy';
import CommonStrategy from './CommonStrategy';
import ScioSpecStrategy from './ScioSpecStrategy';
import ZurichStrategy from './ZurichStrategy';

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
            case 'ScioSpec':
                strategy = new ScioSpecStrategy();        
            break;
            case 'AD5933EBZ':
                strategy = new AD5933EBZStrategy();        
            break;
            case 'Zurich':
                strategy = new ZurichStrategy();        
            break;
            default:
                strategy = new CommonStrategy();
            break;
        }
        return strategy;
    }

    public setStrategy(strategy: string) {
        this.strategy = this.defineStrategy(strategy);
    }

    public async parse(filePath: string, measurer: any) {
        const parsedData = await this.strategy.doParse(filePath, measurer);
        return parsedData;
    }
}