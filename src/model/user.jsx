import Realm from "realm";

const UserSchema = {
    name: "User",
    properties: {
        _id: "string",
        name: "string",
        age: "int",
        email: "string",
        password: "string",
        type: "string",
    },
    primaryKey: "_id",
};

const realm = new Realm({ schema: [UserSchema] });
export default realm;