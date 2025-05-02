import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AddMovieCommentUseCase, type GetMovieCommentsUseCasePresenter } from '../AddMovieCommentUseCase'
import type { AddCommentParams, MovieCommentRepository } from '@/domain/repositories/MovieCommentRepository'
import type { MovieComment } from '@/domain/entities/MovieComment'
import { SuccessResult, FailureResult } from '@/domain/shared/result'


describe('AddMovieCommentUseCase', () => {
    let presenter: GetMovieCommentsUseCasePresenter
    let repository: MovieCommentRepository
    let useCase: AddMovieCommentUseCase

    const validParams: AddCommentParams = {
        movieId: 1,
        userName: 'Alice',
        message: 'Great movie!',
        rating: 4,
    }

    const mockComment: MovieComment = {
        id: 1,
        createdAt: new Date(),
        userName: 'Alice',
        message: 'Great movie!',
        rating: 4,
    }

    beforeEach(() => {
        presenter = {
            success: vi.fn(),
            error: vi.fn(),
            invalidUserName: vi.fn(),
            invalidMessage: vi.fn(),
            invalidRating: vi.fn(),
        }

        repository = {
            addComment: vi.fn(),
            getComments: vi.fn(),
        }

        useCase = new AddMovieCommentUseCase(presenter, repository)
    })

    it('should call success when comment is valid', async () => {
        vi.spyOn(repository, 'addComment').mockResolvedValue(new SuccessResult(mockComment))

        await useCase.execute(validParams)

        expect(presenter.success).toHaveBeenCalledWith(mockComment)
    })

    it('should call invalidUserName if username is invalid', async () => {
        await useCase.execute({ ...validParams, userName: 'Al' })

        expect(presenter.invalidUserName).toHaveBeenCalled()
        expect(presenter.success).not.toHaveBeenCalled()
    })

    it('should call invalidMessage if message is empty', async () => {
        await useCase.execute({ ...validParams, message: '' })

        expect(presenter.invalidMessage).toHaveBeenCalled()
        expect(presenter.success).not.toHaveBeenCalled()
    })

    it('should call invalidRating if rating is out of range', async () => {
        await useCase.execute({ ...validParams, rating: 12 })

        expect(presenter.invalidRating).toHaveBeenCalled()
        expect(presenter.success).not.toHaveBeenCalled()
    })

    it('should call error if repository fails', async () => {
        const error = new Error('something failed')
        vi.spyOn(repository, 'addComment').mockResolvedValue(new FailureResult(error))

        await useCase.execute(validParams)

        expect(presenter.error).toHaveBeenCalled()
    })
})