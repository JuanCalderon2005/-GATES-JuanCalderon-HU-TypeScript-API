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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const buttonLogin = document.querySelector('.submitLogin');
        buttonLogin.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const email = document.querySelector('.email').value;
            const password = document.querySelector('.password').value;
            const booksControllers = new BooksControllers('http://190.147.64.47:5155/', 'api/v1/auth/login');
            let token = yield booksControllers.postLogin({ email: `${email}`, password: `${password}` });
            console.log(token);
        }));
    });
}
// {
//     "email": "prueba@prueba.pru",
//     "password": "C0ntr4S3gu++r4"
//   }
main();
