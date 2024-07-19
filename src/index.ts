import { BooksService } from "./classes/update-book.js";
import { BooksControllers } from "./classes/books-controllers.js";
import { DeleteBooks } from "./classes/delete-book.js";
import { AllBooks } from "./classes/get.books.js";
import { CreateBooks } from "./classes/create-book.js";


async function main() {
    const buttonLogin = document.querySelector('.submitLogin') as HTMLButtonElement;
    if (buttonLogin) {
        buttonLogin.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = (document.querySelector('.email') as HTMLInputElement).value;
            const password = (document.querySelector('.password') as HTMLInputElement).value;

            const booksControllers = new BooksControllers('http://190.147.64.47:5155/', 'api/v1/auth/login');
            let token: string = await booksControllers.postLogin({ email, password });

            localStorage.setItem('token', token);

            if (localStorage.getItem('token')) {
                window.location.href = 'pages/dashboard.html';
            }
        });
    }

    const bookCards = document.querySelector('.container-books') as HTMLDivElement;
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
            card.innerHTML = /*html*/`
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
            bookCards?.appendChild(card);

            const deleteButton = card.querySelector('.delete-button') as HTMLButtonElement;
            deleteButton.addEventListener('click', async () => {
                if (!confirm('Estas seguro de eliminar este libro?')) return;
                const deleteBook = new DeleteBooks(token);
                await deleteBook.deleteBook(book.id);
                card.remove();
                location.reload();
            });

            const editButton = card.querySelector('.edit-button') as HTMLButtonElement;
            editButton.addEventListener('click', () => {
                const dialog = document.getElementById('editDialog') as HTMLDialogElement;
                const form = dialog.querySelector('form') as HTMLFormElement;
                (form.elements.namedItem('title') as HTMLInputElement).value = book.title;
                (form.elements.namedItem('author') as HTMLInputElement).value = book.author;
                (form.elements.namedItem('description') as HTMLTextAreaElement).value = book.description;
                (form.elements.namedItem('summary') as HTMLTextAreaElement).value = book.summary;
                (form.elements.namedItem('publicationDate') as HTMLInputElement).value = book.publicationDate;

                dialog.showModal();

                form.onsubmit = async (event) => {
                    event.preventDefault();
                    if ((event.submitter as HTMLButtonElement).value === 'confirm') {
                        const updatedBook = {
                            title: (form.elements.namedItem('title') as HTMLInputElement).value,
                            author: (form.elements.namedItem('author') as HTMLInputElement).value,
                            description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
                            summary: (form.elements.namedItem('summary') as HTMLTextAreaElement).value,
                            publicationDate: (form.elements.namedItem('publicationDate') as HTMLInputElement).value
                        };

                        const booksService = new BooksService(token);
                        try {
                            const updatedBookData = await booksService.updateBook(book.id, updatedBook);
                            card.querySelector('.card-title')!.textContent = updatedBookData.title;
                            card.querySelector('.card-author')!.textContent = updatedBookData.author;
                            card.querySelector('.card-text')!.textContent = updatedBookData.description;
                            location.reload();
                        } catch (error) {
                            console.error('Error updating book:', error);
                        }
                    }
                    dialog.close();
                };
            });
        });
    });

    const $createBookButton = document.querySelector('.createButton') as HTMLButtonElement;
    $createBookButton.addEventListener('click', () => {
        const token = localStorage.getItem('token');
        const createBook = new CreateBooks(`${token}`);
        createBook.takeDataBook();
    })
    

    
    const $logout = document.querySelector('.logout') as HTMLButtonElement;
    if ($logout) {
        $logout.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = '../index.html';
        });
    }
}

main();
