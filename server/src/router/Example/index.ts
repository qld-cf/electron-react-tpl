import example from '../../controllers/example'
import * as Router from 'koa-router';
const router = new Router();

router.get('*',example)

module.exports = router