import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Post from '../lib/models/Post.js';


describe('demo routes', () => {

  let user = {};
  let agent;

  beforeEach(async() => {
    await setup(pool);
    agent = await request.agent(app);
    user = await UserService.create({
      username: 'Azlynn',
      password: 'password',
      profilePhotoUrl: 'a'
    });
    await agent.post('/api/v1/auth/login')
      .send({
        username: 'Azlynn',
        password: 'password'
      });
  });

  it('creates a post via POST', async() => {

    const res = await agent

      .post('/api/v1/posts')
      .send({
        userId: user.id,
        photoUrl: 'picture',
        caption: 'Lookie Lookie',
        tags: ['winter', 'wonderland']
      });

    expect(res.body).toEqual({
      id: '1',
      userId: user.id,
      photoUrl: 'picture',
      caption: 'Lookie Lookie',
      tags: ['winter', 'wonderland']
    });
  });
});

