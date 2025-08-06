import { User } from '@models';
import { IUser, IUserDoc, UserId } from '@schemas';

class UserDao {
    async create(user: Partial<IUser>): Promise<IUserDoc> {
        return User.create(user);
    }

    async getUserByEmail(email: string) {
        return User.findOne({ email });
    }
}

export default new UserDao();
