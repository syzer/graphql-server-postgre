import {test} from 'tape'
import {config} from './config'
import _ from 'lodash'

test('config', (t) => {
    t.ok(config.host);
    t.end();
});
