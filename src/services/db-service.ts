import { IUserSchema, IUserSchemaObj } from "../schemas/IUserSchema";
import UserSchema from '../schemas/UserSchema';
import mongoose from 'mongoose';
import Log from '../utils/log';

mongoose.connect("mongodb://localhost:27017/tsnode", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => Log.info("Conectada com sucesso", "DATABASE")).catch(error => Log.error(error, "DATABASE"));

export default new class DbService {
  public async wrapperUser(body:IUserSchemaObj): Promise<object> {
    const user = await UserSchema.create(body);
    Log.info(`Usuario criado: ${user.username}(${user._id})`, "DATABASE");
    return user;
  }

  public async findUser(body): Promise<object> {
    const user = await UserSchema.findOne(body);
    if (!user) return;
    Log.info(`Usuario encontrado: ${user.username}(${user._id})`, "DATABASE");
    return user;
  }

  public async deleteUser(body): Promise<object> {
    const user = await UserSchema.deleteOne(body);
    if (!user) return;
    Log.info(`Usuario deletado: ${user.username}(${user._id})`, "DATABASE");
    return user;
  }
};