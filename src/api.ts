export async function fetchJson<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Mạng phản hồi không hợp lệ: ${response.status} ${response.statusText}`);
        }
        return await response.json() as T;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`[API Error] Thao tác bất đồng bộ thất bại: ${error.message}`);
        }
        throw new Error('Đã xảy ra lỗi mạng không xác định.');
    }
}