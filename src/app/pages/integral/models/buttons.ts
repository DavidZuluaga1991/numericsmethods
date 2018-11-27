export class button {
    budisabled: boolean;
    name: string;
    katex: string;
    wolframalpha: string;
    constructor(Name: string, Wolframalpha?: string, Katex?: string){
        this.budisabled = false;
        this.name = Name;
        this.katex = Katex;
        this.wolframalpha = Wolframalpha;
    }
  }