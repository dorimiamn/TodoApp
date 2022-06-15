import {Sequelize} from 'sequelize';

const sequelize=new Sequelize('postgres://postgres:postgres@localhost/todo1');

export default sequelize;