import Sequelize from 'sequelize';
import Faker from 'faker';
import _ from 'lodash';

export function repository(config) {
    const connect = new Sequelize(
        config.dbName,
        'postgres',
        'postgres',
        {
            dialect: 'postgres',
            host: config.host
        }
    );

    return {
        connect
    }
}
