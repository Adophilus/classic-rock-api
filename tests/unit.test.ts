import { client } from '#/setup'
import { describe, test } from 'mocha'
import { expect } from 'chai'
import { StatusCodes } from 'http-status-codes'

describe('Classic Rock', () => {
  let songId = ''

  describe('Songs', () => {
    test('should fetch all songs', (done) => {
      client
        .get('/songs')
        .then(res => {
          const { status, body } = res

          expect(status).to.equal(StatusCodes.OK)
          expect(body).to.have.lengthOf.above(50)

          songId = body[Math.floor(Math.random() * body.length)].id

          done()
        })
        .catch(err => console.log(err))
    })

    test('should not be able to fetch a non-existent song by id', (done) => {
      client
        .get(`/songs/${songId + 1000}`)
        .then(res => {
          const { status, body } = res

          expect(status).to.equal(404)

          done()
        })
        .catch(err => console.log(err))
    })

    test('should fetch a song by id', (done) => {
      client
        .get(`/songs/${songId}`)
        .then(res => {
          const { status } = res

          expect(status).to.equal(StatusCodes.OK)

          done()
        })
        .catch(err => console.log(err))
    })

    test('should ensure that a song is not banned', (done) => {
      client
        .put(`/songs/${songId}/banned`)
        .then(res => {
          const { status, body } = res

          expect(status).to.equal(StatusCodes.OK)
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

          expect(status).to.equal(StatusCodes.NO_CONTENT)

          done()
        })
        .catch(err => console.log(err))
    })

    test('should ensure that a song is banned', (done) => {
      client
        .put(`/songs/${songId}/banned`)
        .then(res => {
          const { status, body } = res

          expect(status).to.equal(StatusCodes.OK)
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

          expect(status).to.equal(StatusCodes.NO_CONTENT)

          done()
        })
        .catch(err => console.log(err))
    })

    test('should ensure that a song is not banned', (done) => {
      client
        .put(`/songs/${songId}/banned`)
        .then(res => {
          const { status, body } = res

          expect(status).to.equal(StatusCodes.OK)
          expect(body).to.have.property('is_banned', false)

          done()
        })
        .catch(err => console.log(err))
    })

    test('should delete a song by id', (done) => {
      client
        .delete(`/songs/${songId}`)
        .then(res => {
          const { status, body } = res

          expect(status).to.equal(StatusCodes.GONE)

          done()
        })
        .catch(err => console.log(err))
    })
  })
})
