
import UserModel from "../model/user.model";

async function findOne(filter) {
    return UserModel.findOne(filter);
}

async function insert(data) {
    const newUser = new UserModel(data);
    return newUser.save();
}

async function update(filter, update) {
    return UserModel.findOneAndUpdate(filter, update);
}

const UserDb = {
    findOne,
    insert,
    update
};

export default UserDb;