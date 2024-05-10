interface ISubCriteria {
  id: number,
  criteriaId: number,
  subPosition: number,
  title: string,
  content: string
}

export class SubCriteria implements ISubCriteria {
  id: number;
  criteriaId: number;
  subPosition: number;
  title: string;
  content: string;
  constructor(id: number, criteriaId: number, subPosition: number, title: string, content: string) {
    this.id = id;
    this.criteriaId = criteriaId;
    this.subPosition = subPosition;
    this.title = title;
    this.content = content;
  }

}
