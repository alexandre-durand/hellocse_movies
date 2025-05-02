
export class MovieCommentUserNameValidator {
    private minLength = 3;
    private maxLength = 50;
    private allowedChars = /^[a-zA-Z_ ]+$/;
    constructor() { }

    isValid(userName: string): boolean {
        return this.isValidLength(userName) && this.isValidAlpha(userName);
    }

    isValidLength(userName: string): boolean {
        return userName.length >= this.minLength && userName.length <= this.maxLength;
    }

    isValidAlpha(userName: string): boolean {
        return this.allowedChars.test(userName);
    }

    getValidationError(userName: string): string {
        if (!this.isValidLength(userName)) {
            return `User name must be between ${this.minLength} and ${this.maxLength} characters long.`;
        }
        if (!this.isValidAlpha(userName)) {
            return "User name must contain only letters, underscores and spaces.";
        }
        return "";
    }
}


export class MovieCommentMessageValidator {
    private minLength = 3;
    private maxLength = 500;
    private allowedChars = /^[a-zA-Z0-9_.,!? ]+$/;
    constructor() { }

    isValid(message: string): boolean {
        return this.isValidLength(message) && this.isValidAlpha(message);
    }

    isValidLength(message: string): boolean {
        return message.length >= this.minLength && message.length <= this.maxLength;
    }

    isValidAlpha(message: string): boolean {
        return this.allowedChars.test(message);
    }

    getValidationError(message: string): string {
        if (!this.isValidLength(message)) {
            return `Message must be between ${this.minLength} and ${this.maxLength} characters long.`;
        }

        if (!this.isValidAlpha(message)) {
            return "Message must contain only letters, numbers, spaces, and the following characters: .,!?";
        }

        return "";
    }
}

export class MovieCommentRatingValidator {
    private minRating = 1;
    private maxRating = 10;
    constructor() { }

    isValid(rating: number): boolean {
        return this.isValidRange(rating) && this.isInteger(rating);
    }

    isValidRange(rating: number): boolean {
        return rating >= this.minRating && rating <= this.maxRating;
    }

    isInteger(rating: number): boolean {
        return Number.isInteger(rating);
    }

    getValidationError(rating: number): string {
        if (!this.isValidRange(rating)) {
            return `Rating must be between ${this.minRating} and ${this.maxRating}.`;
        }

        if (!this.isInteger(rating)) {
            return "Rating must be an integer.";
        }
        return "";
    }
}