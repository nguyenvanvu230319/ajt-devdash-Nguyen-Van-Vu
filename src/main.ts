import { fetchJson } from './api';
import { getState, setState, createMemoizedSearch, debounce } from './state';
import { render, populateUserFilter } from './ui';
import { Post, User } from './types';

const memoizedSearch = createMemoizedSearch();

async function initApp() {
    setState({ status: 'LOADING' });
    render(getState(), handlePostSelection);

    try {
        
        const [postsData, usersData] = await Promise.all([
            fetchJson<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=20'),
            fetchJson<User[]>('https://jsonplaceholder.typicode.com/users')
        ]);

        setState({
            status: 'SUCCESS',
            posts: postsData,
            users: usersData,
            filteredPosts: postsData,
            selectedPostId: null
        });

        populateUserFilter(usersData);
        render(getState(), handlePostSelection);
        setupEventListeners();

    } catch (error) {
        setState({
            status: 'ERROR',
            message: error instanceof Error ? error.message : 'Lỗi không xác định xảy ra khi tải dữ liệu.'
        });
        render(getState(), handlePostSelection);
    }
}

function handlePostSelection(postId: number): void {
    const currentState = getState();
    if (currentState.status === 'SUCCESS') {
        setState({
            ...currentState,
            selectedPostId: postId
        });
        render(getState(), handlePostSelection);
    }
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
    const filterSelect = document.getElementById('filterUser') as HTMLSelectElement | null;

    if (!searchInput || !filterSelect) return;

    const applyFilters = () => {
        const currentState = getState();
        if (currentState.status !== 'SUCCESS') return;

        const searchQuery = searchInput.value;
        const selectedUserId = filterSelect.value;

        
        let stepPosts = currentState.posts;
        if (selectedUserId !== '') {
            stepPosts = currentState.posts.filter(p => p.userId === Number(selectedUserId));
        }

        const finalFiltered = memoizedSearch(stepPosts, searchQuery);

        setState({
            ...currentState,
            filteredPosts: finalFiltered
        });
        
        render(getState(), handlePostSelection);
    };

   
    searchInput.addEventListener('input', debounce(applyFilters, 350));
    filterSelect.addEventListener('change', applyFilters);
}

window.addEventListener('DOMContentLoaded', initApp);