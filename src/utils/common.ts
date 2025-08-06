import { Types } from 'mongoose';
import { IUserDoc, TypesObjectId } from '@schemas';

const { ObjectId } = Types;

const isValidObjectId = (objectId: string): boolean => {
    if (ObjectId.isValid(objectId)) {
        const id: TypesObjectId = new ObjectId(objectId);
        return id.toString() === objectId;
    }
    return false;
};

const getUserObj = (userDoc: IUserDoc) => {
    const keysToBeRemoved = ['password', '__v'];

    const user = userDoc.toJSON();
    keysToBeRemoved.forEach(key => delete user[key]);
    return user;
};

const getSearchRegex = (text: string | undefined): RegExp | null =>
    text
        ? new RegExp(
              text
                  .split(' ')
                  .filter(val => val)
                  .map(value => value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'))
                  .join(' '),
              'i'
          )
        : null;

const toObjectId = (id: string): TypesObjectId => new ObjectId(id);

export { isValidObjectId, toObjectId, getSearchRegex, getUserObj };
