import {test} from 'tape'
import {config} from './config'
import _ from 'lodash'
import Sequelize from 'sequelize'
import Faker from 'faker'

const repoFixture = require('./repoFixture')(_, Faker)

test('config', (t) => {
    t.ok(config.host)
    t.end()
})

test('repository', (t) => {
    let repo = require('./repo').construct(config, repoFixture)
    t.ok(repo.connect)
    t.end()
})

test('repository models', (t) => {
    let repo = require('./repo').construct(config, repoFixture)
    let models = repo
        .getModels(repo.connect())
        .then((conn) => {
            t.ok(conn.models.article)
            t.ok(conn.models.author)
            t.end()
        })
})

test('repository models seed', (t) => {
    let repoFixture = require('./repoFixture')(_, Faker)
    let repo = require('./repo').construct(config, repoFixture)
    let models = repo
        .getModels(repo.connect())
        .then(conn => {
            t.ok(conn.models.article)
            t.ok(conn.models.author)
            return conn
        })
        .then(conn => repo.maybeSeedDb(conn.models))
        .then(() => t.end())
        .catch(console.error)
})

