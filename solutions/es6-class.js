class JSONParser {

  parse(str) {
    return this.autoParse(str)
  }

  autoParse(str) {
    str = str.trim()

    switch (this.getTypeByEndCharacters(str)) {
      case 'array':
        return this.parseArray(str)
      case 'object':
        return this.parseObject(str)
      case 'string':
        return this.parseString(str)
      case 'number':
        return this.parseNumber(str)
    }

    throw Error(`Could not determine type of "${str}"`)
  }

  getTypeByEndCharacters(str) {
    str = str.trim()

    switch (str.charAt(0)) {
      case `[`:
        return 'array'
      case `{`:
        return 'object'
      case `"`:
        return 'string'
    }

    if (!isNaN(Number(str))) {
      return 'number'
    }
  }

  stripEndCharacters(str) {
    str = str.trim()

    return str
      .substr(1, str.length - 2)
      .trim()
  }

  parseString(str) {
    return this
      .stripEndCharacters(str)
  }

  parseNumber(str) {
    return Number(str)
  }

  parseArray(str) {
    return this
      .stripEndCharacters(str)
      .split(',')
      .map(this.autoParse.bind(this))
  }

  parseObject(str) {
    return this
      .stripEndCharacters(str)
      .split(',')
      .reduce((obj, keyValue) => {
        Object.assign(obj, this.parseKeyValue(keyValue))
        return obj
      }, {})
  }

  parseKeyValue(str) {
    const [key, value] = str.split(':')

    return {
      [this.parseString(key)]: this.autoParse(value)
    }
  }

}

module.exports = JSONParser
