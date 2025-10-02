import {Router} from 'express'

import { pingDb } from './status/status.routes'
import { addDoctor, addNurse, getAllEmployees, getEmployeeById } from './employee/employee.routes';

const router = Router();

// Employees

router.post('/doctor', addDoctor);
router.post('/nurse', addNurse);

router.get('/employee', getAllEmployees);
router.get('/employee/:id', getEmployeeById)


router.get('/pingdb', pingDb);


export default router;