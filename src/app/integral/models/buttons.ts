export class button {
    name: string;
    katex: string;
    wolframalpha: string;
    constructor(public Name: string, public Wolframalpha?: string, public Katex?: string){
        this.name = Name;
        this.katex = Katex;
        this.wolframalpha = Wolframalpha;
    }
  }