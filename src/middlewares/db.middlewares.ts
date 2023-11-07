import bcrypt from "bcrypt";

import { userSchema } from "../models";

userSchema.pre("save", async function()
{
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(this.password, salt);

    this.password = password;
}
);
