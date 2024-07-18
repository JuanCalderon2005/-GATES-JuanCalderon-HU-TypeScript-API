import { BooksControllers } from "./classes/books-controllers.js";
async function main() {

    const buttonLogin = document.querySelector('.submitLogin') as HTMLButtonElement
    buttonLogin.addEventListener('click', async (e) => {
        e.preventDefault()
        const email = (document.querySelector('.email') as HTMLInputElement).value
        const password = (document.querySelector('.password') as HTMLInputElement).value

        const booksControllers = new BooksControllers('http://190.147.64.47:5155/', 'api/v1/auth/login');
        let token: string = await booksControllers.postLogin({ email: `${email}`, password: `${password}` });
        
        localStorage.setItem('token', token);

        if (localStorage.getItem('token')) {
            window.location.href = 'pages/dashboard.html';
        }
    });

}

// {
//     "email": "prueba@prueba.pru",
//     "password": "C0ntr4S3gu++r4"
//   }

main();