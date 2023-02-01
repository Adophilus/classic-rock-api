import { client } from '#/setup'
import { describe, test } from 'mocha'
// import { expect } from 'chai'

describe('Classic Rock', () => {
  describe('Songs', () => {
    test('should fetch all songs', async () => {
      const res = await client.get('/songs')
      console.log(res)
    })
  })
})
