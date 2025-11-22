import express, { Router } from 'express';
import {
  addReminderController,
  getAllRemindersController,
  getReminderByUuidController,
  updateReminderByUuidController,
} from '@server/controllers';
import { asyncHandler } from '@server/utils';

const router: Router = express.Router({ mergeParams: true });

router.post('/', asyncHandler(addReminderController));

router.get('/', asyncHandler(getAllRemindersController));
router.get('/:uuid', asyncHandler(getReminderByUuidController));

router.patch('/:uuid', asyncHandler(updateReminderByUuidController));

export default router;
