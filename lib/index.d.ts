interface RX {
    (template: TemplateStringsArray, ...args: any[]): RegExp;
    [key: string]: (template: TemplateStringsArray, ...args: any[]) => RegExp;
}
export declare const rx: RX;
export {};
