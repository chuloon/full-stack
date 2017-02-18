$(document).ready(function () {
    ko.applyBindings(new primeNumberViewModel());
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

function primeNumberViewModel() {
    this.startingValue = ko.observable(1);
    this.endingValue = ko.observable(5);
    this.primeList = ko.observable([]);

    this.generate = (startingValue, endingValue) => {
        let primeList = [];
        this.primeList([]);

        //ensure startingValue is always less than endingValue
        if(startingValue === endingValue) {
            return isPrime(startingValue) ? [startingValue] : [];
        }
        else if(startingValue > endingValue) {
            let temp = startingValue;
            startingValue = endingValue;
            endingValue = temp;
        }

        for (var i = startingValue; i <= endingValue; i++) {
            if (isPrime(i)) {
                primeList.push(i);
            }
        }

        console.log(primeList);
        this.primeList(primeList);
        return primeList;
    }
}