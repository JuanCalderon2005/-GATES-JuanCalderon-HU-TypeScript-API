import { BodyRequestLogin } from "../interfaces/books.models.js";
export class BooksControllers {

    constructor(private domain: string, private enpointLogin: string){}

    async postLogin(data:BodyRequestLogin): Promise<string> {
        const headers: Record<string, string>={
            'Content-Type':'application/json'
        }
    
        const reqOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }
    
    
        const url = this.domain+this.enpointLogin
        const result = await fetch(url,reqOptions);
    
        console.log(result.status);
    
        if(result.status !== 201){
            throw new Error("Conexion fallida");
        }
    
        const token = (await result.json()).data.token;
    
        console.log(`${token}`);
        return token;
    }
}