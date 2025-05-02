import { describe, it, expect, beforeEach, vi } from 'vitest'
import { LocalStorageMovieCommentRepository } from '../LocalStorageMovieCommentRepository'

const movieId = 123
const storageKey = `movie_comments_${movieId}`

function mockLocalStorage() {
    let store: Record<string, string> = {}

    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value
        }),
        clear: () => {
            store = {}
        }
    }
}

describe('LocalStorageMovieCommentRepository', () => {
    const localStorageMock = mockLocalStorage()

    beforeEach(() => {
        localStorageMock.clear()
        vi.stubGlobal('localStorage', localStorageMock)
    })

    it('should return an empty array if no comments exist', async () => {
        const repo = new LocalStorageMovieCommentRepository()
        const result = await repo.getComments({ movieId })

        expect(result.ok).toBe(true)
        if (result.ok) {
            expect(result.data).toEqual([])
        }
    })

    it('should add a comment and retrieve it', async () => {
        const repo = new LocalStorageMovieCommentRepository()

        const commentParams = {
            movieId,
            userName: 'John Doe',
            message: 'Great movie!',
            rating: 5
        }

        const addResult = await repo.addComment(commentParams)
        expect(addResult.ok).toBe(true)
        if (!addResult.ok) {
            throw new Error('Failed to add comment')
        }
        expect(addResult.data).toMatchObject({
            userName: commentParams.userName,
            message: commentParams.message,
            rating: commentParams.rating
        })

        const getResult = await repo.getComments({ movieId })
        expect(getResult.ok).toBe(true)
        if (!getResult.ok) {
            throw new Error('Failed to get comments')
        }
        expect(getResult.data.length).toBe(1)
        expect(getResult.data[0]).toEqual(addResult.data)
    })

    it('should return error if stored JSON is malformed', async () => {
        localStorageMock.setItem(storageKey, 'INVALID_JSON')

        const repo = new LocalStorageMovieCommentRepository()
        const result = await repo.getComments({ movieId })

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.error).toBeInstanceOf(Error)
        }
    })
})
