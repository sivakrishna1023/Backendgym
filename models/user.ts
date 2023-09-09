import mongoose,{Document} from "mongoose";
import jwt  from "jsonwebtoken";

interface Userdocument extends Document{
    firstname:string,
    lastname:string,
    gmail:string,
    contact:Number,
    password:string,
    getJWTToken(): string;
    comparepassword(password: string): Promise<boolean>;
}
const userSchema= new mongoose.Schema({
    firstname:{
        type: String,
      //  required:true
    },
    Lastname:{
        type:String,
       // required:true
    },
    gmail:{
        type:String,
       // required:true,
    },
    contact:{
        type: Number,
       // required:true,
    },
    password:{
        type:String,
       // required:true,
    }
});
userSchema.methods.getJWTToken = function () {
    const Secret = process.env.SECRET as string;
    return jwt.sign({ id: this._id },"123", { expiresIn: `1h` });
};
userSchema.methods.comparepassword = async function (password: string) {
    return this.Password===password;
};

export const Users = mongoose.model<Userdocument>('users',userSchema);
  