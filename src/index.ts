import { BooksControllers } from "./classes/books-controllers.js";

async function main() {

    document.addEventListener('submit', async (e) => {
        e.preventDefault();

        const $email = document.querySelector('.email') as HTMLInputElement;
        const $password = document.querySelector('.password') as HTMLInputElement;

        const email = $email.value;
        const password = $password.value;

        const booksControllers = new BooksControllers('http://190.147.64.47:5155/','api/v1/auth/login');
        let token = await booksControllers.postLogin({email, password});

        console.log(token);
        

    })
}

// {
//     "email": "prueba@prueba.pru",
//     "password": "C0ntr4S3gu++r4"
//   }

main();