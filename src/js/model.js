

class TipCalculator {

    _tipAmount;
    _total;

    constructor() {
        this._tipAmount = 0;
        this._total = 0;
    }

    calculateTip(bill, tip, numberOfPeople) {

        if (bill === '0') {
            let error = new Error('Cant be zero')
            error.type = 'bill';
            throw error;
        }


        if (numberOfPeople === '0') {
            let error = new Error('Cant be zero')
            error.type = 'numberOfPeople';
            throw error;
        }

        this._tipAmount = bill * tip / 100 / numberOfPeople;

        this._total = bill / numberOfPeople + this._tipAmount;

        return [this._tipAmount, this._total];

    }
}

export default new TipCalculator();