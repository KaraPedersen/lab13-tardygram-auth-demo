  
import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth';
import Comment from '../models/Comment';

export default Router()
  .post('/api/v1/comments', ensureAuth, (req, res, next) => {
 
    Comment.insert({ ...req.body, commentBy: req.user.id })
      .then(comment => res.send(comment))
      .catch(next);
  })

  .delete('/api/v1/comments/:id', ensureAuth, (req, res, next) => {
    Comment.delete(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  });
