import { Router } from 'express';
import {
  getStateData,
  getDistrictData,
  getStates,
  getDistrictsByState,
} from '../controllers/districtController';

const router = Router();

// Route to get a list of all states
router.get('/states', getStates);

// Route to get a list of districts for a specific state
router.get('/states/:stateName/districts', getDistrictsByState);

// Route to get the latest data for all districts in a state
router.get('/states/:stateName', getStateData);

// Route to get time-series data for a specific district
router.get('/states/:stateName/districts/:districtName', getDistrictData);

export default router;
