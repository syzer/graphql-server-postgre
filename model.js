module.exports = function modelSql(Conn, Sequelize) {
    return {
        getArticleSchema,
        getAuthorSchema
    }

    function getArticleSchema() {
        return Conn.define('article', {
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            abstract: {
                type: Sequelize.STRING,
                allowNull: false
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false
            }
        })
    }

    function getAuthorSchema() {
        return Conn.define('author', {
            firstName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                validate: {
                    isEmail: true
                }
            }
        })
    }
}
