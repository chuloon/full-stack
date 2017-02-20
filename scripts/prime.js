$(document).ready(function () {
    ko.applyBindings(new primeNumberViewModel());

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
});

isPrime = (num) => {
    if (num === 2) {
        return true;
    }
    else if (num === 1 || num === 0) {
        return false;
    }
    for (var i = 2; i <= Math.ceil(Math.sqrt(num)) ; i++) {
        if (num % i == 0) {
            return false;
        }
    }

    return true;
}

ko.validation.init({
    grouping: {
        deep: true,
        live: true,
        observable: true
    }
});

function primeNumberViewModel() {
    this.inputFields = {
        startingValue: ko.observable().extend({ required: true, number: true }),
        endingValue: ko.observable().extend({ required: true, number: true })
    };
    //this.startingValue = ko.observable().extend({ required: true });
    //this.endingValue = ko.observable(5).extend({ required: true });
    this.primeList = ko.observable([]);

    this.errors = ko.validation.group(this.inputFields);

    ko.validation.rules.pattern.message = 'Invalid.';

    this.submitClick = (startingValue, endingValue) => {
        if (this.errors().length > 0) {
            this.errors.showAllMessages();
            toastr["error"]("Invalid fields detected");
            return;
        }

        this.generate(startingValue, endingValue);
    }

    this.generate = (startingValue, endingValue) => {
        let primeList = [];
        this.primeList([]);

        if (startingValue > endingValue) {
            let temp = startingValue;
            startingValue = endingValue;
            endingValue = temp;
        }

        for (var i = startingValue; i <= endingValue; i++) {
            if (isPrime(i)) {
                primeList.push(i);
            }
        }

        if (primeList.length === 0) {
            this.primeList().push("There are no prime numbers within the specified range.");
            primeList.push("There are no prime numbers within the specified range.");
        }

        console.log(primeList);
        this.primeList(primeList);
        return primeList;
    }
}