var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class BooksService {
    constructor(token) {
        this.token = token;
    }
    updateBook(bookId, updatedBook) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            };
            const reqOptions = {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(updatedBook)
            };
            const url = `http://190.147.64.47:5155/api/v1/books/${bookId}`;
            const result = yield fetch(url, reqOptions);
            if (result.status !== 200) {
                throw new Error("Failed to update book");
            }
            const updatedBookData = yield result.json();
            return updatedBookData;
        });
    }
}
