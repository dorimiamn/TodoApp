import sequelize from './db_config';
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import Todo from './todo';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare userId: string;
    declare name: string;
    declare todo: any;
}

User.init({
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    todo: {
        type: DataTypes.JSON,
    }
}, { sequelize });

export default User;