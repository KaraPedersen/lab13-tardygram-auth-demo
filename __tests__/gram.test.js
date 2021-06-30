import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';

const agent = request.agent(app);

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a gram via POST', async() => {
    const res = await request(app)
      .post('/api/v1/grams')
      .send({
        user: 'Azlynn',
        photoUrl: 'picture',
        caption: 'Lookie Lookie',
        tags: ['winter', 'wonderland']
      });

    expect(res.body).toEqual({
      user: 'Azlynn',
      photoUrl: 'picture',
      caption: 'Lookie Lookie',
      tags: ['winter', 'wonderland']
    });
  });
});

