import Realm from "realm";

const UserSchema = {
    name: "User",
    properties: {
        name: "string",
        age: "int",
        email: "string",
        password: "string",
    },
    primaryKey: "_id",
};

const realm = new Realm({ schema: [UserSchema] });
export default realm;