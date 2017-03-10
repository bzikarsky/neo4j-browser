/* global describe, test, expect */
import * as utils from './utils'

describe('utils', () => {
  test('can deeply compare objects', () => {
    // Given
    const o1 = {a: 'a', b: 'b', c: {c: 'c'}}
    const o2 = {...o1}
    const o3 = {...o1, c: {c: 'd'}}

    // When & Then
    expect(utils.deepEquals(o1, o2)).toBeTruthy()
    expect(utils.deepEquals(o1, o3)).toBeFalsy()
  })
  test('can move items in an array', () => {
    // Given
    const tests = [
      { test: [1, 2, 3], from: -1, to: 1, expect: false },
      { test: [1, 2, 3], from: 0, to: 3, expect: false },
      { test: [1, 2, 3], from: 5, to: 1, expect: false },
      { test: 'string', from: 0, to: 3, expect: false },
      { test: [1, 2, 3], from: 0, to: 1, expect: [2, 1, 3] },
      { test: [1, 2, 3], from: 2, to: 1, expect: [1, 3, 2] },
      { test: [1, 2, 3], from: 2, to: 0, expect: [3, 1, 2] }
    ]

    // When && Then
    tests.forEach((t) => {
      expect(utils.moveInArray(t.from, t.to, t.test)).toEqual(t.expect)
    })
  })
  test('can parse url params correctly', () => {
    // Given
    const urls = [
      {location: 'http://neo4j.com/?param=1', paramName: 'param', expect: ['1']},
      {location: 'http://neo4j.com/?param=1&param=2', paramName: 'param', expect: ['1', '2']},
      {location: 'http://neo4j.com/?param2=2&param=1', paramName: 'param', expect: ['1']},
      {location: 'http://neo4j.com/?param=', paramName: 'param', expect: undefined},
      {location: 'http://neo4j.com/', paramName: 'param', expect: undefined}
    ]

    // When & Then
    urls.forEach((tCase) => {
      const res = utils.getUrlParamValue(tCase.paramName, tCase.location)
      expect(res).toEqual(tCase.expect)
    })
  })
})