import { AppState, User } from './types';

export function render(state: AppState, onPostSelect: (id: number) => void): void {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    switch (state.status) {
        case 'LOADING':
            mainContent.innerHTML = `<div class="loading">Đang đồng bộ dữ liệu song song từ máy chủ API...</div>`;
            break;

        case 'ERROR':
            mainContent.innerHTML = `
                <div class="error-msg">
                    <h3>Hệ thống Dashboard gặp lỗi nghiêm trọng</h3>
                    <p>${state.message}</p>
                </div>`;
            break;

        case 'SUCCESS':
            if (state.filteredPosts.length === 0) {
                mainContent.innerHTML = `<p style="text-align:center; padding:2rem; color:var(--text-muted);">Không có bài viết nào phù hợp với bộ lọc tìm kiếm.</p>`;
            } else {
                mainContent.innerHTML = `
                    <div class="grid">
                        ${state.filteredPosts.map(post => {
                            const author = state.users.find(u => u.id === post.userId);
                            return `
                                <div class="card" data-id="${post.id}">
                                    <h3>${post.title.substring(0, 40)}...</h3>
                                    <p>${post.body.substring(0, 85)}...</p>
                                    <span class="tag">✍️ Tác giả: ${author ? author.name : 'Ẩn danh'}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;

                const cards = mainContent.querySelectorAll('.card');
                cards.forEach(card => {
                    card.addEventListener('click', () => {
                        const id = Number(card.getAttribute('data-id'));
                        onPostSelect(id);
                    });
                });
            }
            renderDetail(state);
            break;
    }
}

function renderDetail(state: AppState): void {
    const detailContent = document.getElementById('detailContent');
    if (!detailContent || state.status !== 'SUCCESS') return;

    if (state.selectedPostId === null) {
        detailContent.innerHTML = `
            <div class="detail-panel">
                <h3>Thông tin chi tiết</h3>
                <p style="color: var(--text-muted); margin-top: 1rem;">Bấm chọn một thẻ bài viết bất kỳ ở bên trái để xem thông tin chi tiết.</p>
            </div>`;
        return;
    }

    const currentPost = state.posts.find(p => p.id === state.selectedPostId);
    if (!currentPost) return;

    const currentAuthor = state.users.find(u => u.id === currentPost.userId);

    detailContent.innerHTML = `
        <div class="detail-panel">
            <span style="color:var(--accent); font-weight:bold; font-size:0.85rem; text-transform:uppercase;">Chi tiết bài viết #${currentPost.id}</span>
            <h2 style="margin-top: 0.5rem;">${currentPost.title}</h2>
            <p style="margin-top: 1rem; line-height: 1.6; color:#e2e8f0;">${currentPost.body}</p>
            
            <div class="detail-meta">
                <p><strong>Tác giả:</strong> ${currentAuthor ? currentAuthor.name : 'Ẩn danh'}</p>
                <p><strong>Email:</strong> ${currentAuthor ? currentAuthor.email : 'Không có'}</p>
                <p><strong>Tên tài khoản:</strong> @${currentAuthor ? currentAuthor.username : 'unknown'}</p>
            </div>
        </div>
    `;
}

export function populateUserFilter(users: User[]): void {
    const filterSelect = document.getElementById('filterUser') as HTMLSelectElement | null;
    if (!filterSelect) return;
    
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id.toString();
        option.textContent = user.name;
        filterSelect.appendChild(option);
    });
}