import { UserEntity } from "../entity/user";

export class Factory {
    protected handler: UserEntity

    constructor(handler: UserEntity) {
        this.handler = handler;
    }
}