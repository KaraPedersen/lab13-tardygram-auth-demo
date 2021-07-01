import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Post from '../lib/models/Post.js';
import Comment from '../lib/models/Comment.js';

describe('demo routes', () => {

  let user = {}; 
  let post = {};
  let agent;
  
  beforeEach(async() => {
    await setup(pool);
    agent = request.agent(app);
    user = await UserService.create({
      username: 'Azlynn',
      password: 'password',
      profilePhotoUrl: 'a'
    });
    await agent.post('/api/v1/auth/login')
      .send({
        username: 'Azlynn',
        password:'password'
      });
  });
  
  it('creates a comment via POST', async() => {
   
    post = await Post.insert({
      userId: user.id,
      photoUrl: 'picture',
      caption: 'Holy Cow! Look at that!',
      tags: ['cow', 'summer time sadness']
    });

 
  
    const res = await agent
      .post('/api/v1/comments')
      .send({
        commentBy: user.id,
        post: post.id,
        comment: 'Beautiful!',
      });
 
    expect(res.body).toEqual({
      id: '1',
      commentBy: user.id,
      post: post.id,
      comment: 'Beautiful!',
    });
  });

  it('deletes a comment', async() => {

    post = await Post.insert({
      userId: user.id,
      photoUrl: 'picture',
      caption: 'Holy Cow! Look at that!',
      tags: ['cow', 'summer time sadness']
    });
      
    const comment = await Comment.insert({
      id: '1',
      commentBy: user.id,
      post: post.id,
      comment: 'Beautiful!',
    });

    const res = await agent
      .delete(`/api/v1/comments/${comment.id}`)
      .send(comment);

    expect(res.body).toEqual(comment);

  });
});
