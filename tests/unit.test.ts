import { client } from '#/setup'
import { describe, test } from 'mocha'
import { expect } from 'chai'

describe('Classic Rock', () => {
  describe('Songs', () => {
    test('should fetch all songs', (done) => {
      client
        .get('/songs')
        .then(res => {
          const { status } = res

          expect(status).to.equal(200)

          done()
        })
        .catch(err => console.log(err))
    })
  })
})
