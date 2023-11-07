import bcrypt from "bcrypt";
import { Schema } from 'mongoose';

import { IUser } from "../../types";

export function beforeSaveUser(schema: Schema<IUser>) {
    schema.pre("save", async function() {
        const user = this;
        
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(user.password, salt);
    
        user.password = password;
    });
}
