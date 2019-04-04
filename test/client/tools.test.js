import { expect } from 'chai'
import { set, setupHandleChange } from '../../client/tools'

describe('tools', () => {
  it('set function correctly sets non-nested value', () => {
    let a = {
      a: 1
    }
    set(a, ['b'], 10)
    expect(a.b).to.equal(10)
  })

  it('set function correctly sets nested values', () => {
    let a = {
      a: 1
    }
    set(a, ['b', 'c'], 10)
    expect(a.b.c).to.equal(10)
  })

  it('set function correctly sets string values', () => {
    let a = {
      a: 1
    }
    set(a, 'b', 10)
    expect(a.b).to.equal(10)
  })

  // it('set function correctly throws error with non-string non-array inputs', () => {
  //   let a = {
  //     a: 1
  //   }
  //   try {
  //     set(a, undefined, 10)
  //   } catch (e) {

  //   }
  //   expect(true).to.equal(true)
  // })

  it('setupHanlder returns a function', () => {
    let a = {
      setState: _ => 0
    }
    let output = setupHandleChange(a)
    expect(output instanceof Function).to.equal(true)
  })

  it('setupHanlder returns an event listener', () => {
    let a = {
      state: { a: 1 },
      setState: _ => 0
    }
    let result = setupHandleChange(a)(['state'])({ target: { value: 10 } })
    expect(result).to.equal(undefined)
  })
})
