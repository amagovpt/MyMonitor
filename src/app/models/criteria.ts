import { SubCriteria } from "./subCriteria";

interface ICriteria {
  id: number,
  title: string
  subCriteria: SubCriteria[];
}

export class Criteria implements ICriteria {
  id: number;
  title: string;
  subCriteria: SubCriteria[];
  subCount :number
  constructor(id: number,title:string,subCount:number) {
    this.id = id;
    this.title = title;
    this.subCriteria = [];
    this.subCount = subCount;
  }

}
