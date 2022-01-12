import view from './view.js';
import model from './model.js';

class TipCalculatorController {

    _view;
    _model;

    constructor(view, model) {
        this._view = view;
        this._model = model;
    }

    _controlCalculateTip() {

        const [bill, tip, numberOfPeople] = this._view.getData();

        if (!bill || !tip || !numberOfPeople) {

            this._view.clear();

            return;
        }

        try {

            const [tipAmount, total] = this._model.calculateTip(bill, tip, numberOfPeople);

            this._view.renderResults(tipAmount, total);

            this._view.clearErrors();

        } catch (e) {

            this._view.renderError(e.type, e.message);

        }
    }

    _controlReset() {
        this._view.reset();
        this._view.clear();
    }

    init() {
        this._view.addHandlerInputBill(this._controlCalculateTip.bind(this));
        this._view.addHandlerInputNumberOfPeople(this._controlCalculateTip.bind(this));
        this._view.addHandlerInputCustomTip(this._controlCalculateTip.bind(this));
        this._view.addHandlerSelectTip(this._controlCalculateTip.bind(this));
        this._view.addHandlerReset(this._controlReset.bind(this));
    }
}

const app = new TipCalculatorController(view, model);

app.init();