import { EntityFactory } from "./entity";
import { UserEntity } from "../entity/user";


export class UserFactory extends EntityFactory<UserEntity> {
    findByEmail(email: string): Promise<UserEntity> {
        return new Promise((resolve, reject) => {

        })
    }



}