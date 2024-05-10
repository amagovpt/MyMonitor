export class WebsiteDTO {
    constructor(){
    }
    WebsiteId: number;
    UserId: 1;
    Name: string;
    StartingUrl: string;
    Declaration: string;
    Declaration_Update_Date: Date;
    Stamp: number;
    Stamp_Update_Date: Date;
    Creation_Date: Date;
    User: string;
    Entity: any;
    Pages: number;
    tags: TagDto[];
    entities: any[]
}
export class TagDto {
    TagId: number;
    UserId: number;
    Name: string;
    Creation_Date: Date;
}