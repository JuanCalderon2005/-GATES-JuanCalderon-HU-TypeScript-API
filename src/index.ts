import { BooksControllers } from "./classes/books-controllers.js";
import { DeleteBooks } from "./classes/delete-book.js";
import { AllBooks } from "./classes/get.books.js";
async function main() {

    const buttonLogin = document.querySelector('.submitLogin') as HTMLButtonElement;
    if (buttonLogin) {
        buttonLogin.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = (document.querySelector('.email') as HTMLInputElement).value;
            const password = (document.querySelector('.password') as HTMLInputElement).value;

            const booksControllers = new BooksControllers('http://190.147.64.47:5155/', 'api/v1/auth/login');
            let token: string = await booksControllers.postLogin({ email: `${email}`, password: `${password}` });

            localStorage.setItem('token', token);

            if (localStorage.getItem('token')) {
                window.location.href = 'pages/dashboard.html';
            }
        });
    }

    const bookCards = document.querySelector('.container-books') as HTMLDivElement;

    const token = localStorage.getItem('token');

    const allBooks = new AllBooks(`${token}`);
    allBooks.getAllBooks().then((books) => {
        books.forEach(book => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = /*html*/`
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
                <p class="card-text">${book.description}</p>
                <div class="card-actions">
                    <button class="delete-button">Delete</button>
                    <button class="edit-button">Edit</button>
                </div>
            </div>
            `;
            bookCards?.appendChild(card);

            const deleteButton = card.querySelector('.delete-button') as HTMLButtonElement;
            deleteButton.addEventListener('click', async () => {
                const deleteBook = new DeleteBooks(`${token}`);
                deleteBook.deleteBook(book.id).then((books) => {
                    location.reload();
                });
            })

            const buttonLogout = document.querySelector('.logout') as HTMLButtonElement;
            buttonLogout.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('token');
                window.location.href = '../index.html';
            });
        });
    });


}
// {
//     "email": "prueba@prueba.pru",
//     "password": "C0ntr4S3gu++r4"
//   }

main();