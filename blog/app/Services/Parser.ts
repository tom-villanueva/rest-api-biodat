class Parser {
    private strategy: Strategy;

    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    public parse(data) {
        const parsedData = this.strategy.doParse(data);
        return parsedData;
    }
}