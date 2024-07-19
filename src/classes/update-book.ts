import { Result } from "../interfaces/IResponseBooks";

export class BooksService {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    async updateBook(bookId: string, updatedBook: Partial<Result>): Promise<Result> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        };

        const reqOptions: RequestInit = {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(updatedBook)
        };

        const url = `http://190.147.64.47:5155/api/v1/books/${bookId}`;
        const result = await fetch(url, reqOptions);

        if (result.status !== 200) {
            throw new Error("Failed to update book");
        }

        const updatedBookData: Result = await result.json();
        return updatedBookData;
    }
}
