export type User = {
    username: string;
    name: string;
}

export type getUserResolver = (_: any, args: { username: string }) => User | undefined;