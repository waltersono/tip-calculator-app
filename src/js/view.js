
class View {

    _inputBill = document.querySelector('.tip-calculator--bill');
    _inputNumberOfPeople = document.querySelector('.tip-calculator--number-of-people');
    _inputCustomTip = document.querySelector('.tip-calculator__btn--custom-tip');
    _tipContainer = document.querySelector('.tip-calculator__tips');
    _labelTipAmount = document.querySelector('.tip-calculator--tip-amount');
    _labelTotal = document.querySelector('.tip-calculator--total');
    _btnReset = document.querySelector('.tip-calculator__btn--reset');
    _inputErrorNumberOfPeople = document.querySelector('.tip-calculator__error--number-of-people');
    _inputErrorBill = document.querySelector('.tip-calculator__error--bill');

    addHandlerInputBill(handler) {
        this._inputBill.addEventListener('keyup', function (e) {
            handler();
        });
    }

    addHandlerInputNumberOfPeople(handler) {
        this._inputNumberOfPeople.addEventListener('keyup', function (e) {
            handler();
        });
    }

    addHandlerReset(handler) {
        this._btnReset.addEventListener('click', function (e) {
            e.preventDefault();
            handler();
        });
    }


    addHandlerSelectTip(handler) {

        this._tipContainer.addEventListener('click', (e) => {
            e.preventDefault();

            const input = e.target.closest('.tip-calculator__btn');

            if (!input) return;

            document.querySelector('.tip-calculator__btn--active').classList.remove('tip-calculator__btn--active');

            input.classList.add('tip-calculator__btn--active');

            if (input.value !== 'Custom') {

                this._inputCustomTip.value = 'Custom';

                handler();

            } else {

                input.value = '';

                input.focus();

                this.clear();
            }

        });
    }

    addHandlerInputCustomTip(handler) {

        this._inputCustomTip.addEventListener('keyup', function (e) {

            const number = isFinite(e.key);

            if (!number && e.key !== 'Backspace') return;

            if (e.key === 'Backspace') {

                this.value = this.value.substring(0, this.value.length - 1);

            } else {

                this.value += e.key;

            }

            handler();
        });
    }


    getData() {

        const bill = this._inputBill.value;

        const tip = this._tipContainer.querySelector('.tip-calculator__btn--active').value.replace('%', '');
        const numberOfPeople = this._inputNumberOfPeople.value;

        return [bill, tip, numberOfPeople];
    }

    renderResults(tipAmount, total) {
        this._labelTipAmount.textContent = this._formatCurrenct(tipAmount);
        this._labelTotal.textContent = this._formatCurrenct(total);
    }

    renderError(place, message) {
        switch (place) {
            case 'numberOfPeople':
                this._inputErrorNumberOfPeople.classList.remove('hidden');
                this._inputErrorNumberOfPeople.textContent = message;
                break;
            case 'bill':
                this._inputErrorBill.classList.remove('hidden');
                this._inputErrorBill.textContent = message;
                break;
            default:
                break;
        }
    }

    clear() {
        this._labelTipAmount.textContent = '$0';
        this._labelTotal.textContent = '$0';
    }

    clearErrors() {
        this._inputErrorNumberOfPeople.classList.add('hidden');
        this._inputErrorBill.classList.add('hidden');
    }

    reset() {
        this._inputCustomTip.value = 'Custom';
        this._inputBill.value = '';
        this._inputNumberOfPeople.value = '';
    }

    _formatCurrenct(value) {
        return Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }

}

export default new View();