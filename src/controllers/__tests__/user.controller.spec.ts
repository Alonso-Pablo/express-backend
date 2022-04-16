import request from 'supertest'
import app from '../../index'

describe('GET /api/v1/users', () => {
  test('should return 200', async () => {
    const response = await request(app).get('/api/v1/users')
    expect(response.statusCode).toBe(200)
  })
})