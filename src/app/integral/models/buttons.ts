export class button {
    budisabled: string;
    name: string;
    katex: string;
    wolframalpha: string;
    constructor(Name: string, Wolframalpha?: string, Katex?: string){
        this.budisabled = 'enabled';
        this.name = Name;
        this.katex = Katex;
        this.wolframalpha = Wolframalpha;
    }
  }