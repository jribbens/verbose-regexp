interface RX {
  (template: TemplateStringsArray, ...args: any[]): RegExp
  [key: string]: (template: TemplateStringsArray, ...args: any[]) => RegExp
}

function trim (str: string): string {
  return str.replace(/\/\/.*/g, '').replace(/ *\n */g, '')
}

function parse (template: TemplateStringsArray, ...subs: any[]): string {
  return subs.reduce(
    (result: string, sub, i) =>
      result + (sub instanceof RegExp ? `(?:${sub.source})` : String(sub)) +
        trim(template.raw[i + 1]), trim(template.raw[0])
  )
}

const _rx = (
  (template: TemplateStringsArray, ...args: any[]
  ): RegExp => new RegExp(parse(template, ...args))) as RX

export const rx: RX = new Proxy(_rx, {
  get (target, flags: string) {
    return function (
      template: TemplateStringsArray, ...args: any[]
    ): RegExp {
      return new RegExp(parse(template, ...args), flags)
    }
  }
})
