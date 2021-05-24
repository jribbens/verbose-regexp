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
      result + String(sub) + trim(template.raw[i + 1]), trim(template.raw[0])
  )
}

export const rx: RX = (
  (template: TemplateStringsArray, ...args: any[]
  ): RegExp => new RegExp(parse(template, ...args))) as RX

const FLAGS = 'dgimsuy'

for (let i = 1; i < (1 << FLAGS.length); i++) {
  const flags = FLAGS.replace(
    /./g, (char, offset) => (i & (1 << offset)) > 0 ? char : '')
  rx[flags] = function (
    template: TemplateStringsArray, ...args: any[]
  ): RegExp {
    return new RegExp(parse(template, ...args), flags)
  }
}
