export interface IBlog {
    title: string
    body: string
    author: string
}

export interface IUser {
    username: string
    name?: string
    password: string
    email: string
    profile?: string
    role: number
    photo?: Buffer
}
