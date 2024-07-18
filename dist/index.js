var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BooksControllers } from "./classes/books-controllers.js";
import { AllBooks } from "./classes/get.books.js";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const buttonLogin = document.querySelector('.submitLogin');
        if (buttonLogin) {
            buttonLogin.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                e.preventDefault();
                const email = document.querySelector('.email').value;
                const password = document.querySelector('.password').value;
                const booksControllers = new BooksControllers('http://190.147.64.47:5155/', 'api/v1/auth/login');
                let token = yield booksControllers.postLogin({ email: `${email}`, password: `${password}` });
                localStorage.setItem('token', token);
                if (localStorage.getItem('token')) {
                    window.location.href = 'pages/dashboard.html';
                }
            }));
        }
        const bookCards = document.querySelector('.container-books');
        console.log(bookCards);
        const token = localStorage.getItem('token');
        const allBooks = new AllBooks(`${token}`);
        allBooks.getAllBooks().then((books) => {
            books.forEach(book => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = /*html*/ `
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
                <p class="card-text">${book.description}</p>
                <p class="card-text">${book.publicationDate}</p>
            </div>
            `;
                bookCards === null || bookCards === void 0 ? void 0 : bookCards.appendChild(card);
            });
        });
    });
}
// {
//     "email": "prueba@prueba.pru",
//     "password": "C0ntr4S3gu++r4"
//   }
main();
