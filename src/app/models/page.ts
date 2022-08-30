import { Evaluation } from './evaluation';

export class Page {

  evaluation: Evaluation;
  uri:string;
  id:number;

  constructor(uri: string,id:number) {
    this.uri = uri;
    this.id = id;
  }

  addEvaluation(score: number, errors: any, tot: any, A: number, AA: number, AAA: number, evaluationDate: Date): void {
    this.evaluation = new Evaluation(score, errors, tot, A, AA, AAA, evaluationDate);
  }
}
