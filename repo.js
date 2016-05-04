import Sequelize from 'sequelize'
import Faker from 'faker'
import _ from 'lodash'
import model from './model'

export const construct = (config, repoFixture) => {
    let models;

    return {
        connect,
        getModels,
        maybeSeedDb: repoFixture.maybeSeedDb
    };

    function connect() {
        return new Sequelize(
            config.dbName,
            config.username,
            config.password,
            {
                dialect: 'postgres',
                host: config.host
            }
        )
    }

    function getModels(Conn) {
        const models = model(Conn, Sequelize) // dont drink and code
        const Article = models.getArticleSchema()
        const Author = models.getAuthorSchema()

        Author.hasMany(Article)
        Article.belongsTo(Author)

        return Conn.sync({force: true})
    }

}
