import { client } from '#/setup'
import { describe, test } from 'mocha'
import { expect } from 'chai'

describe('Classic Rock', () => {
  let songId = ''

  describe('Songs', () => {
    test('should fetch all songs', (done) => {
      client
        .get('/songs')
        .then(res => {
          const { status, body } = res

          expect(status).to.equal(200)
          expect(body).to.have.lengthOf.above(50)

          songId = body[Math.floor(Math.random() * body.length)].id

          done()
        })
        .catch(err => console.log(err))
    })

    test('should ensure that a song is not banned', (done) => {
      client
        .put(`/songs/${songId}/banned`)
        .then(res => {
          const { status, body } = res

          expect(status).to.equal(200)
          expect(body).to.have.property('is_banned', false)

          done()
        })
        .catch(err => console.log(err))
    })

    test('should ban a song', (done) => {
      client
        .put(`/songs/${songId}/ban`)
        .then(res => {
          const { status } = res

          expect(status).to.equal(204)

          done()
        })
        .catch(err => console.log(err))
    })

    test('should ensure that a song is banned', (done) => {
      client
        .put(`/songs/${songId}/banned`)
        .then(res => {
          const { status, body } = res

          expect(status).to.equal(200)
          expect(body).to.have.property('is_banned', true)

          done()
        })
        .catch(err => console.log(err))
    })

    test('should unban a song', (done) => {
      client
        .put(`/songs/${songId}/unban`)
        .then(res => {
          const { status } = res

          expect(status).to.equal(204)

          done()
        })
        .catch(err => console.log(err))
    })

    test('should ensure that a song is not banned', (done) => {
      client
        .put(`/songs/${songId}/banned`)
        .then(res => {
          const { status, body } = res

          expect(status).to.equal(200)
          expect(body).to.have.property('is_banned', false)

          done()
        })
        .catch(err => console.log(err))
    })
  })
})
