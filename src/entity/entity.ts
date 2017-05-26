import * as uuid from "node-uuid";

export class Entity{
    guid: String;
    className: string = "V";
    createdAtStamp: number;
    updatedAtStamp: number;
    constructor() {
        if (!this.guid) {
            this.guid = uuid.v4();
        }
        if(!this.createdAtStamp){
            this.createdAtStamp = new Date().getTime();
            this.updatedAtStamp = this.createdAtStamp;
        }
    }
}