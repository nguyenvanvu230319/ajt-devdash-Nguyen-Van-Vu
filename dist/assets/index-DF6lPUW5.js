(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();async function u(e){try{const t=await fetch(e);if(!t.ok)throw new Error(`Mạng phản hồi không hợp lệ: ${t.status} ${t.statusText}`);return await t.json()}catch(t){throw t instanceof Error?new Error(`[API Error] Thao tác bất đồng bộ thất bại: ${t.message}`):new Error("Đã xảy ra lỗi mạng không xác định.")}}let h={status:"LOADING"};function c(){return h}function a(e){h=e}function m(){const e={};return(t,r)=>{const s=`${r.toLowerCase().trim()}_${t.length}`;if(e[s])return e[s];const n=t.filter(i=>i.title.toLowerCase().includes(r.toLowerCase()));return e[s]=n,n}}function g(e,t){let r=null;return(...s)=>{r&&clearTimeout(r),r=setTimeout(()=>{e(...s)},t)}}function d(e,t){const r=document.getElementById("mainContent");if(r)switch(e.status){case"LOADING":r.innerHTML='<div class="loading">Đang đồng bộ dữ liệu song song từ máy chủ API...</div>';break;case"ERROR":r.innerHTML=`
                <div class="error-msg">
                    <h3>Hệ thống Dashboard gặp lỗi nghiêm trọng</h3>
                    <p>${e.message}</p>
                </div>`;break;case"SUCCESS":e.filteredPosts.length===0?r.innerHTML='<p style="text-align:center; padding:2rem; color:var(--text-muted);">Không có bài viết nào phù hợp với bộ lọc tìm kiếm.</p>':(r.innerHTML=`
                    <div class="grid">
                        ${e.filteredPosts.map(n=>{const i=e.users.find(o=>o.id===n.userId);return`
                                <div class="card" data-id="${n.id}">
                                    <h3>${n.title.substring(0,40)}...</h3>
                                    <p>${n.body.substring(0,85)}...</p>
                                    <span class="tag">✍️ Tác giả: ${i?i.name:"Ẩn danh"}</span>
                                </div>
                            `}).join("")}
                    </div>
                `,r.querySelectorAll(".card").forEach(n=>{n.addEventListener("click",()=>{const i=Number(n.getAttribute("data-id"));t(i)})})),y(e);break}}function y(e){const t=document.getElementById("detailContent");if(!t||e.status!=="SUCCESS")return;if(e.selectedPostId===null){t.innerHTML=`
            <div class="detail-panel">
                <h3>Thông tin chi tiết</h3>
                <p style="color: var(--text-muted); margin-top: 1rem;">Bấm chọn một thẻ bài viết bất kỳ ở bên trái để xem thông tin chi tiết.</p>
            </div>`;return}const r=e.posts.find(n=>n.id===e.selectedPostId);if(!r)return;const s=e.users.find(n=>n.id===r.userId);t.innerHTML=`
        <div class="detail-panel">
            <span style="color:var(--accent); font-weight:bold; font-size:0.85rem; text-transform:uppercase;">Chi tiết bài viết #${r.id}</span>
            <h2 style="margin-top: 0.5rem;">${r.title}</h2>
            <p style="margin-top: 1rem; line-height: 1.6; color:#e2e8f0;">${r.body}</p>
            
            <div class="detail-meta">
                <p><strong>Tác giả:</strong> ${s?s.name:"Ẩn danh"}</p>
                <p><strong>Email:</strong> ${s?s.email:"Không có"}</p>
                <p><strong>Tên tài khoản:</strong> @${s?s.username:"unknown"}</p>
            </div>
        </div>
    `}function v(e){const t=document.getElementById("filterUser");t&&e.forEach(r=>{const s=document.createElement("option");s.value=r.id.toString(),s.textContent=r.name,t.appendChild(s)})}const E=m();async function S(){a({status:"LOADING"}),d(c(),l);try{const[e,t]=await Promise.all([u("https://jsonplaceholder.typicode.com/posts?_limit=20"),u("https://jsonplaceholder.typicode.com/users")]);a({status:"SUCCESS",posts:e,users:t,filteredPosts:e,selectedPostId:null}),v(t),d(c(),l),b()}catch(e){a({status:"ERROR",message:e instanceof Error?e.message:"Lỗi không xác định xảy ra khi tải dữ liệu."}),d(c(),l)}}function l(e){const t=c();t.status==="SUCCESS"&&(a({...t,selectedPostId:e}),d(c(),l))}function b(){const e=document.getElementById("searchInput"),t=document.getElementById("filterUser");if(!e||!t)return;const r=()=>{const s=c();if(s.status!=="SUCCESS")return;const n=e.value,i=t.value;let o=s.posts;i!==""&&(o=s.posts.filter(p=>p.userId===Number(i)));const f=E(o,n);a({...s,filteredPosts:f}),d(c(),l)};e.addEventListener("input",g(r,350)),t.addEventListener("change",r)}window.addEventListener("DOMContentLoaded",S);
