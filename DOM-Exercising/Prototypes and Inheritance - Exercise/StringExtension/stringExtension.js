

(function solve() {
    String.prototype.ensureStart = function (str) {
        if (!this.startsWith(str)) {
            return str + this;
        }
        return this.toString();
    }

    String.prototype.ensureEnd = function (str) {
        if (!this.endsWith(str)) {
            return this + str;
        }
        return this.toString();
    }

    String.prototype.isEmpty = function () {
        if (this == '') {
            return true;
        }
        return false;
    };

    String.prototype.truncate = function (n) {
        if (n < 4) {
            return '.'.repeat(n);
        }

        if (this.length <= n) {
            return this.toString();
        }

        let truncatedString = this.slice(0, n - 3);

        const lastSpaceIndex = truncatedString.lastIndexOf(' ');

        if (lastSpaceIndex !== -1) {
            truncatedString = truncatedString.slice(0, lastSpaceIndex);
        }

        return truncatedString + '...';
    };

    String.format = function (inputString, ...params) {
        return inputString.replace(/{(\d+)}/g, function (match, index) {
            return typeof params[index] !== 'undefined' ? params[index] : match;
        });
    };
})()