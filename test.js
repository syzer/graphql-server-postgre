import {test} from 'tape'
import {config} from './config'
import _ from 'lodash'
import Sequelize from 'sequelize'

test('config', (t) => {
    t.ok(config.host);
    t.end();
});

test('repository', (t) => {
    let repo = require('./repo').construct(config);
    t.ok(repo.connect);
    t.end();
});
