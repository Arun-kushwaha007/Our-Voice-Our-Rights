import { Router } from 'express';  
import {  
  getStateData,  
  getDistrictData,  
  getStates,  
  getDistrictsByState,  
} from '../controllers/districtController';  
  
const router = Router();  
  
// Route to get a list of all states (MUST come first)  
router.get('/states', getStates);  
  
// Route to get a list of districts for a specific state  
router.get('/states/:stateName/districts', getDistrictsByState);  
  
// Route to get time-series data for a specific district  
router.get('/states/:stateName/districts/:districtName', getDistrictData);  
  
// Route to get the latest data for all districts in a state (MUST come last)  
router.get('/states/:stateName', getStateData);  
  
export default router;