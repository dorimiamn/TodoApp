import sequelize from './db_config';
import {Model,InferAttributes,InferCreationAttributes,CreationOptional, DataTypes} from 'sequelize';

class User extends Model<InferAttributes<User>,InferCreationAttributes<User>>{
    declare userId:number;
    declare name:string;
}

User.init({
    userId:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{sequelize});

export default User;