const request = require('supertest');
const app = require('./index'); // Import your Express app

describe('API Endpoints', () => {
  // Example test for GET /posts
  test('GET /posts should return all posts', async () => {
    const res = await request(app)
      .get('/posts')
      .expect(200);
    
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // Example test for POST /posts
  test('POST /posts should create a new post', async () => {
    const newPost = { title: 'Test Post', content: 'Test Content' };
    
    const res = await request(app)
      .post('/posts')
      .send(newPost)
      .expect(201);
    
    expect(res.body.title).toBe(newPost.title);
    expect(res.body.content).toBe(newPost.content);
  });
});