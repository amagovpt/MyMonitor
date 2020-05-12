import { Evaluation } from './evaluation';

export class Page {

  evaluation: Evaluation;

  constructor() {}

  addEvaluation(score: string, errors: any, tot: any, A: number, AA: number, AAA: number, evaluationDate: Date): void {
    this.evaluation = new Evaluation(score, errors, tot, A, AA, AAA, evaluationDate);
  }
}
