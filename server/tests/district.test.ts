import request from 'supertest';
import app from '../src/app';
import * as districtService from '../src/services/districtService';

jest.mock('../src/services/districtService');

describe('District API', () => {
  it('should return a list of states', async () => {
    const mockStates = ['State1', 'State2'];
    (districtService.listStates as jest.Mock).mockResolvedValue(mockStates);

    const response = await request(app).get('/api/districts/states');
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockStates);
  });
});
