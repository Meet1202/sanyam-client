export interface User{
    uid: string,
    email: string
    password?: string,
    username?: string,
    number?: number,
    joiningdate?:Date,
    image?:string,
    designation?:string,
    mentor?:string,
    amount?:[{
        date?:Date,
        money?:number
    }],
}
