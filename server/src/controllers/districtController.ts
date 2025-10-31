import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import * as districtService from '../services/districtService';
import { logger } from '../utils/logger';

/**
 * Controller to get the latest data for all districts in a specific state.
 */
export const getStateData = asyncHandler(async (req: Request, res: Response) => {
  const { stateName } = req.params;
  if (!stateName) {
    return res.status(400).json({ message: 'State name is required.' });
  }

  try {
    const data = await districtService.getLatestStateData(stateName);
    if (data.length === 0) {
      return res.status(404).json({ message: `No data found for state: ${stateName}` });
    }
    res.json({ data });
  } catch (error) {
    logger.error(`Error fetching data for state ${stateName}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * Controller to get the time-series data for a specific district.
 */
export const getDistrictData = asyncHandler(async (req: Request, res: Response) => {
  const { stateName, districtName } = req.params;
  if (!stateName || !districtName) {
    return res.status(400).json({ message: 'State and district names are required.' });
  }

  try {
    const data = await districtService.getDistrictTimeSeries(stateName, districtName);
    if (data.length === 0) {
      return res.status(404).json({ message: `No data found for district: ${districtName}, ${stateName}` });
    }
    res.json({ data });
  } catch (error) {
    logger.error(`Error fetching data for district ${districtName}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * Controller to get a list of all available states.
 */
export const getStates = asyncHandler(async (req: Request, res: Response) => {
  try {
    const states = await districtService.listStates();
    res.json({ data: states });
  } catch (error) {
    logger.error('Error fetching states list:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * Controller to get a list of all districts for a given state.
 */
export const getDistrictsByState = asyncHandler(async (req: Request, res: Response) => {
  const { stateName } = req.params;
  if (!stateName) {
    return res.status(400).json({ message: 'State name is required.' });
  }

  try {
    const districts = await districtService.listDistrictsByState(stateName);
    res.json({ data: districts });
  } catch (error) {
    logger.error(`Error fetching districts for state ${stateName}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});
