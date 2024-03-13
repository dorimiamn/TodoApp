import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('todo', 'postgres', 'postgres', {
    host: 'db',
    dialect: 'postgres'
});

export default sequelize;