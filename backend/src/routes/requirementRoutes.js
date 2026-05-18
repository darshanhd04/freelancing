import express from 'express';
import {
  createRequirement,
  getRequirements,
  getMyRequirements,
} from '../controllers/requirementController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, createRequirement).get(protect, admin, getRequirements);
router.route('/myrequirements').get(protect, getMyRequirements);

export default router;
