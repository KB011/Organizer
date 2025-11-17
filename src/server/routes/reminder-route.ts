import express, { Router } from 'express';
import { addReminderController } from '@server/controllers';
import { asyncHandler } from '@server/utils';

const router: Router = express.Router({ mergeParams: true });

router.post('/', asyncHandler(addReminderController));

export default router;
