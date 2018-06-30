const expect = require('chai').expect
const JSONParser = require('./parser')

describe('Write a JSON Parser', () => {
  let jsonParser

  before(() => {
    jsonParser = new JSONParser()
  })

  it('has a .parse() method', () => {
    expect(jsonParser.parse).to.be.a('function')
  })

  it('supports array of numbers', () => {
    const result = jsonParser.parse(` [ 10, 20, 30.1 ] `)
    expect(result).to.be.an('array')
    expect(result.length).to.equal(3)
    expect(result[0]).to.equal(10)
    expect(result[1]).to.equal(20)
    expect(result[2]).to.equal(30.1)
  })

  it('supports array of strings', () => {
    const result = jsonParser.parse(` [ "Hey", "hello" ] `)
    expect(result).to.be.an('array')
    expect(result.length).to.equal(2)
    expect(result[0]).to.equal('Hey')
    expect(result[1]).to.equal('hello')
  })

  it('supports array of numbers and strings', () => {
    const result = jsonParser.parse(` [ 10 , 20, "hello", 30.1 ] `)
    expect(result).to.be.an('array')
    expect(result.length).to.equal(4)
    expect(result[0]).to.equal(10)
    expect(result[1]).to.equal(20)
    expect(result[2]).to.equal('hello')
    expect(result[3]).to.equal(30.1)
  })

  it('supports objects with properties', () => {
    result = jsonParser.parse(`{
              "hello": "world",
              "key1": 20,
              "key2": 20.3,
              "foo": "bar" }`)
    expect(result).to.be.an('object')
    expect(result).to.have.property('hello')
    expect(result.hello).to.equal('world')
    expect(result).to.have.property('key1')
    expect(result.key1).to.equal(20)
    expect(result).to.have.property('key2')
    expect(result.key2).to.equal(20.3)
    expect(result).to.have.property('foo')
    expect(result.foo).to.equal('bar')
  })

  it('supports nested objects', () => {
    result = jsonParser.parse(`{
              "hello": "world",
              "key1": 20,
              "key2": 20.3,
              "foo": {
                  "hello1": "world1",
                  "key3": [200, 300]
              } }`)
    expect(result.foo).to.be.an('object')
    expect(result.foo).to.have.property('hello1')
    expect(result.foo.hello1).to.equal('world1')
    expect(result.foo).to.have.property('key3')
    expect(result.foo.key3).to.be.an('array')
    expect(result.foo.key3[0]).to.equal(200)
    expect(result.foo.key3[1]).to.equal(300)
  })

})
