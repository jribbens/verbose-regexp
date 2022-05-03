import assert from 'assert'

import { rx } from '../'

describe('rx', () => {
  it('should compile regular expressions', () => {
    const regexp = rx`hello`
    assert(regexp instanceof RegExp)
    assert.strictEqual(regexp.source, 'hello')
    assert.strictEqual(regexp.flags, '')
  })

  it('should ignore verbose white space', () => {
    const regexp = rx`
    
    
    hello
    

    there
    

    `
    assert(regexp instanceof RegExp)
    assert.strictEqual(regexp.source, 'hellothere')
    assert.strictEqual(regexp.flags, '')
  })

  it('should not ignore in-line white space', () => {
    const regexp = rx`  hello    there  `
    assert(regexp instanceof RegExp)
    assert.strictEqual(regexp.source, '  hello    there  ')
    assert.strictEqual(regexp.flags, '')
  })

  it('should allow comments', () => {
    const regexp = rx`
    // pay me no heed
    
    hello   // you can't see me
    

    there   // this is irrelevant\ yes it is
    

    `
    assert(regexp instanceof RegExp)
    assert.strictEqual(regexp.source, 'hellothere')
    assert.strictEqual(regexp.flags, '')
  })

  it('should preserve backslashes', () => {
    const regexp = rx`jam\x20tomorrow`
    assert(regexp instanceof RegExp)
    assert.strictEqual(regexp.source, 'jam\\x20tomorrow')
    assert.strictEqual(regexp.flags, '')
  })

  it('should allow interpolation', () => {
    const foo = 'folk\x73'
    const bar = 'evening'
    const regexp = rx.i`hello ${foo}! Good ${bar}.`
    assert(regexp instanceof RegExp)
    assert.strictEqual(regexp.source, 'hello folks! Good evening.')
    assert.strictEqual(regexp.flags, 'i')
  })

  it('should allow single flags', () => {
    const regexp = rx.i`hello`
    assert(regexp instanceof RegExp)
    assert.strictEqual(regexp.source, 'hello')
    assert.strictEqual(regexp.flags, 'i')
  })

  it('should allow multiple flags', () => {
    const regexp = rx.gi`hello`
    assert(regexp instanceof RegExp)
    assert.strictEqual(regexp.source, 'hello')
    assert.strictEqual(regexp.flags, 'gi')
  })

  it('should allow multiple flags in any order', () => {
    const regexp = rx.ig`hello`
    assert(regexp instanceof RegExp)
    assert.strictEqual(regexp.source, 'hello')
    assert.strictEqual(regexp.flags, 'gi')
  })

  it('should reject invalid regex flags', () => {
    assert.throws(() => rx.x`hello`, /Invalid flags supplied/)
  })

  it('should work with the date example', () => {
    const dateTime = rx`
      (\d{4}-\d{2}-\d{2}) // date
      T                   // time separator
      (\d{2}:\d{2}:\d{2}) // time
    `
    const result = dateTime.exec(
      new Date('2020-05-24T12:34:56Z').toISOString()
    )
    assert(result !== null)
    assert.strictEqual(result[1], '2020-05-24')
    assert.strictEqual(result[2], '12:34:56')
  })

  it('should work with the URL example', () => {
    const url = rx.i`
      [ ]*([a-z]+):\/\/ // scheme
      ([^/]+)           // location
      (/.*)?            // path
    `
    const result = url.exec('   https://example.com/foo')
    assert(result !== null)
    assert.strictEqual(result[1], 'https')
    assert.strictEqual(result[2], 'example.com')
    assert.strictEqual(result[3], '/foo')
  })
})
