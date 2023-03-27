import sequelize from "./db_config";
import { DataTypes, Model } from 'sequelize';


class Todo extends Model {
    declare todoId: number;
    declare userId: number;
    declare text: string;
    declare checked: boolean;
}

Todo.init({
    todoId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, { sequelize })

export default Todo;