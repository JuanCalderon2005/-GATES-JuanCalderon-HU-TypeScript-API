import { IResponseBooks,Result } from "../interfaces/IResponseBooks";
export class AllBooks{
    constructor(private token: string){}
    async getAllBooks(): Promise<Result[]> {
        const headers: Record<string, string>={
            'Content-Type':'application/json',
            'Authorization':`Bearer ${this.token}`
        }
    
        const reqOptions: RequestInit = {
            method: 'GET',
            headers: headers,
        }
    
        const url = 'http://190.147.64.47:5155/api/v1/books'
        const result = await fetch(url,reqOptions);
        

        console.log(result.body);
    
        if(result.status !== 200){
            throw new Error("Conexion fallida");
        }
    
        const Response = JSON.stringify((await result.json()))
        const ResponseParse : IResponseBooks = JSON.parse(Response);
        
        const Data: Result[] = ResponseParse.data;
        console.log(ResponseParse);
        console.log(Data);
        return Data;
    }
}