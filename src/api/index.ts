import {Router} from 'express'

import { pingDb } from './status/status.routes'

const router = Router();


router.get('/pingdb', pingDb);

export default router;