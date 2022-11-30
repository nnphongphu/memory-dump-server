
import UserModel from "../model/user.model.js";

async function findOne(filter) {
    return UserModel.findOne(filter);
}

async function insert(data) {
    const newUser = new UserModel(data);
    await newUser.save();
    return newUser;
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