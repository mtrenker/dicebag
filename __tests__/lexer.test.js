const { lex } = require('../src/lexer.js')

describe('lex', () => {
  it('lexes the empty string', () => {
    expect(lex('')).toEqual([])
  })

  it('signals an error on unexpected input', () => {
    expect(lex('q')).toBe('error')
  })

  describe('ignores whitespace', () => {
    it('2 d 4', () => {
      expect(lex('2 d 4')).not.toBe('error')
    })

    it('   1d8', () => {
      expect(lex('   1d8')).not.toBe('error')
    })

    it('3d4   ', () => {
      expect(lex('3d4   ')).not.toBe('error')
    })
  })

  describe('lexes basic dice', () => {
    it('1d6', () => {
      expect(lex('1d6')).toEqual([
        { type: 'constant', value: 1 },
        { type: 'd' },
        { type: 'constant', value: 6 }
      ])
    })

    it('42d172', () => {
      expect(lex('42d172')).toEqual([
        { type: 'constant', value: 42 },
        { type: 'd' },
        { type: 'constant', value: 172 }
      ])
    })
  })

  describe('lexes addition', () => {
    it('1d6 + 1d4', () => {
      expect(lex('1d6 + 1d4')).toEqual([
        { type: 'constant', value: 1 },
        { type: 'd' },
        { type: 'constant', value: 6 },
        { type: '+' },
        { type: 'constant', value: 1 },
        { type: 'd' },
        { type: 'constant', value: 4 }
      ])
    })

    it('2d17 + 4', () => {
      expect(lex('2d17 + 4')).toEqual([
        { type: 'constant', value: 2 },
        { type: 'd' },
        { type: 'constant', value: 17 },
        { type: '+' },
        { type: 'constant', value: 4 }
      ])
    })
  })

  describe('lexes subtraction', () => {
    it('1d6 - 1d4', () => {
      expect(lex('1d6 - 1d4')).toEqual([
        { type: 'constant', value: 1 },
        { type: 'd' },
        { type: 'constant', value: 6 },
        { type: '-' },
        { type: 'constant', value: 1 },
        { type: 'd' },
        { type: 'constant', value: 4 }
      ])
    })

    it('2d17 - 4', () => {
      expect(lex('2d17 - 4')).toEqual([
        { type: 'constant', value: 2 },
        { type: 'd' },
        { type: 'constant', value: 17 },
        { type: '-' },
        { type: 'constant', value: 4 }
      ])
    })
  })

  describe('lexes parentheses', () => {
    it('(1d6)d6', () => {
      expect(lex('(1d6)d6')).toEqual([
        { type: '(' },
        { type: 'constant', value: 1 },
        { type: 'd' },
        { type: 'constant', value: 6 },
        { type: ')' },
        { type: 'd' },
        { type: 'constant', value: 6 }
      ])
    })

    it('2d(6+3)d4', () => {
      expect(lex('2d(6+3)d4')).toEqual([
        { type: 'constant', value: 2 },
        { type: 'd' },
        { type: '(' },
        { type: 'constant', value: 6 },
        { type: '+' },
        { type: 'constant', value: 3 },
        { type: ')' },
        { type: 'd' },
        { type: 'constant', value: 4 }
      ])
    })
  })
})