import express, { Router } from 'express';
import { addReminderController, getReminderByUuidController } from '@server/controllers';
import { asyncHandler } from '@server/utils';

const router: Router = express.Router({ mergeParams: true });

router.post('/', asyncHandler(addReminderController));
router.get('/:uuid', asyncHandler(getReminderByUuidController));

export default router;
