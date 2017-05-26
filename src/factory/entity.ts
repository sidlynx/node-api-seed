import { Entity } from "../entity/entity";
import { Factory } from "./factory";

export class EntityFactory<T extends Entity> extends Factory{

    save(t:T){

    }
    findOneByGuid(guid:string){

    }
    update(t:T){

    }
    deleteUnsafe(t:T){

    }

    isSaved(t:T){

    }
}