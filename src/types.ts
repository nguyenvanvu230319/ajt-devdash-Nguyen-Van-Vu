
export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}


export type PostPreview = Pick<Post, 'id' | 'title'>;

// Quản trị luồng trạng thái an toàn bằng Discriminated Union (LOADING / SUCCESS / ERROR)
export type AppState = 
    | { status: 'LOADING' }
    | { status: 'SUCCESS'; posts: Post[]; users: User[]; filteredPosts: Post[]; selectedPostId: number | null }
    | { status: 'ERROR'; message: string };