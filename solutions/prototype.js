function JSONParser() {}

JSONParser.prototype.parse = function(inputStr) {
  var str = inputStr.trim();
  var parts;
  var result;
  var resultType;

  // Create an Array or Object based on starting character
  if (str.charAt(0) === '[') {
      result = [];
      resultType = 'array';
  }
  else if (str.charAt(0) === '{') {
      result = {};
      resultType = 'object';
  }

  if (resultType === 'array') {
      parts = str.slice(1, str.length - 1).split(',');
      parts.forEach(function(part) {
        result.push(this.convertToValue(part));
      }, this);
  }
  if (resultType === 'object') {
      parts = str.slice(1, str.length - 1).split(',');
      parts.forEach(function(part, i) {
          var keyValue = part.split(':');

          // Cancel if extra space
          if (keyValue.length < 2) {
              return;
          }

          var key = this.convertToValue(keyValue[0].trim());
          var value = keyValue[1].trim();


          // If a nested array or object
          if (['{', '['].indexOf(value.charAt(0)) === 0) {
              // Reach in and grab out future values
              var iPlus = Number(i);
              var nextPart;
              var endingChar = {'{':'}','[':']'}[value.charAt(0)];
              do {
                  nextPart = parts[++iPlus].trim();
                  console.log('nextPart', nextPart)
              }
              while (nextPart.charAt(nextPart.length - 1) !== endingChar)
              console.log('value', value);
              console.log('value remaining', keyValue.slice(1).join(':'))
              console.log('parts', parts);
              console.log('parts', parts.splice(i, iPlus).join(','))
              result[key] = this.parse(parts.splice(i, iPlus).join(','));
              return;
          }

          result[key] = this.convertToValue(value)
      }, this);
  }

  return result;
}

JSONParser.prototype.convertToValue = function(string) {
    string = string.trim();

    // It's a string
    if (string.charAt(0) === '"') {
        return string.slice(1, string.length - 1).toString();
    }
    // It's a number
    else {
        return Number(string);
    }
}

module.exports = JSONParser
