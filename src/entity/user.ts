import { Entity } from "./entity";

import * as uuid from "node-uuid";

export class UserEntity extends Entity {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: number;
    password: string;
    className: string = "USER";


    /**
     *
     *
     * @param {string} firstName
     * @param {string} lastName
     * @param {string} email
     * @param {string} password
     *
     * @memberOf UserEntity
     */
    constructor(firstName: string, lastName: string, email: string, password: string) {
        super();
        this.guid = uuid.v4();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.createdAtStamp = new Date().getTime();
        this.updatedAtStamp = this.createdAtStamp;
    }
}