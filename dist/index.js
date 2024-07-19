var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BooksService } from "./classes/update-book.js";
import { BooksControllers } from "./classes/books-controllers.js";
import { DeleteBooks } from "./classes/delete-book.js";
import { AllBooks } from "./classes/get.books.js";
import { CreateBooks } from "./classes/create-book.js";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const buttonLogin = document.querySelector('.submitLogin');
        if (buttonLogin) {
            buttonLogin.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                const email = document.querySelector('.email').value;
                const password = document.querySelector('.password').value;
                const booksControllers = new BooksControllers('http://190.147.64.47:5155/', 'api/v1/auth/login');
                let token = yield booksControllers.postLogin({ email, password });
                localStorage.setItem('token', token);
                if (localStorage.getItem('token')) {
                    window.location.href = 'pages/dashboard.html';
                }
            }));
        }
        const bookCards = document.querySelector('.container-books');
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found in local storage');
            return;
        }
        const allBooks = new AllBooks(token);
        allBooks.getAllBooks().then((books) => {
            books.forEach(book => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = /*html*/ `
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-author">${book.author}</h6>
                <p class="card-text">${book.description}</p>
                <div class="card-actions">
                    <button class="delete-button">Delete</button>
                    <button class="edit-button">Edit</button>
                </div>
            </div>
            `;
                bookCards === null || bookCards === void 0 ? void 0 : bookCards.appendChild(card);
                const deleteButton = card.querySelector('.delete-button');
                deleteButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                    if (!confirm('Estas seguro de eliminar este libro?'))
                        return;
                    const deleteBook = new DeleteBooks(token);
                    yield deleteBook.deleteBook(book.id);
                    card.remove();
                    location.reload();
                }));
                const editButton = card.querySelector('.edit-button');
                editButton.addEventListener('click', () => {
                    const dialog = document.getElementById('editDialog');
                    const form = dialog.querySelector('form');
                    form.elements.namedItem('title').value = book.title;
                    form.elements.namedItem('author').value = book.author;
                    form.elements.namedItem('description').value = book.description;
                    form.elements.namedItem('summary').value = book.summary;
                    form.elements.namedItem('publicationDate').value = book.publicationDate;
                    dialog.showModal();
                    form.onsubmit = (event) => __awaiter(this, void 0, void 0, function* () {
                        event.preventDefault();
                        if (event.submitter.value === 'confirm') {
                            const updatedBook = {
                                title: form.elements.namedItem('title').value,
                                author: form.elements.namedItem('author').value,
                                description: form.elements.namedItem('description').value,
                                summary: form.elements.namedItem('summary').value,
                                publicationDate: form.elements.namedItem('publicationDate').value
                            };
                            const booksService = new BooksService(token);
                            try {
                                const updatedBookData = yield booksService.updateBook(book.id, updatedBook);
                                card.querySelector('.card-title').textContent = updatedBookData.title;
                                card.querySelector('.card-author').textContent = updatedBookData.author;
                                card.querySelector('.card-text').textContent = updatedBookData.description;
                                location.reload();
                            }
                            catch (error) {
                                console.error('Error updating book:', error);
                            }
                        }
                        dialog.close();
                    });
                });
            });
        });
        const $createBookButton = document.querySelector('.createButton');
        $createBookButton.addEventListener('click', () => {
            const token = localStorage.getItem('token');
            const createBook = new CreateBooks(`${token}`);
            createBook.takeDataBook();
        });
        const $logout = document.querySelector('.logout');
        if ($logout) {
            $logout.addEventListener('click', () => {
                localStorage.removeItem('token');
                window.location.href = '../index.html';
            });
        }
    });
}
main();
