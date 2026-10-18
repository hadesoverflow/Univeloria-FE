/**
 * Appwrite Storage Service for UniVeloria
 * Handles image uploads to Appwrite Cloud Storage (https://appwrite.io/)
 */

const DEFAULT_ENDPOINT = 'https://fra.cloud.appwrite.io/v1';

export const appwriteService = {
  /**
   * Get current Appwrite configuration
   */
  getConfig: () => {
    const endpoint =
      import.meta.env.VITE_APPWRITE_ENDPOINT ||
      localStorage.getItem('univeloria_appwrite_endpoint') ||
      DEFAULT_ENDPOINT;
    const projectId =
      import.meta.env.VITE_APPWRITE_PROJECT_ID ||
      localStorage.getItem('univeloria_appwrite_project_id') ||
      '6ad40aaa003d14874b45';
    const bucketId =
      import.meta.env.VITE_APPWRITE_BUCKET_ID ||
      localStorage.getItem('univeloria_appwrite_bucket_id') ||
      '6ad453e1001ed76927c1';

    return {
      endpoint: endpoint.replace(/\/+$/, ''),
      projectId: projectId.trim(),
      bucketId: bucketId.trim(),
      isConfigured: Boolean(projectId.trim() && bucketId.trim())
    };
  },

  /**
   * Save Appwrite credentials into localStorage
   */
  saveConfig: ({ endpoint, projectId, bucketId }) => {
    if (endpoint) localStorage.setItem('univeloria_appwrite_endpoint', endpoint.trim());
    if (projectId) localStorage.setItem('univeloria_appwrite_project_id', projectId.trim());
    if (bucketId) localStorage.setItem('univeloria_appwrite_bucket_id', bucketId.trim());
    return appwriteService.getConfig();
  },

  /**
   * Upload an image to Appwrite Storage bucket
   * @param {File} file - Image file to upload
   * @param {Function} [onProgress] - Optional progress callback: (percent) => {}
   * @returns {Promise<{ fileId: string, url: string, previewUrl: string, name: string }>}
   */
  /**
   * Alias helper to upload product image and return string URL
   */
  uploadProductImage: async (file, onProgress) => {
    const res = await appwriteService.uploadImage(file, onProgress);
    return res.url || res.previewUrl;
  },

  uploadImage: (file, onProgress) => {
    return new Promise((resolve, reject) => {
      const config = appwriteService.getConfig();

      if (!config.projectId || !config.bucketId) {
        reject(
          new Error(
            'Chưa thiết lập Appwrite Project ID hoặc Bucket ID. Vui lòng nhấn nút "Cài đặt Appwrite" để nhập cấu hình từ Appwrite Console.'
          )
        );
        return;
      }

      if (!file) {
        reject(new Error('Vui lòng chọn tệp hình ảnh để tải lên.'));
        return;
      }

      // Check file size (max 15MB)
      if (file.size > 15 * 1024 * 1024) {
        reject(new Error('Kích thước ảnh vượt quá giới hạn cho phép (tối đa 15MB).'));
        return;
      }

      // Generate a unique File ID for Appwrite (max 36 chars, alphanumeric)
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().slice(0, 10);
      const uniqueFileId = ('uvl_' + Date.now().toString(36) + '_' + sanitizedName).slice(0, 32);

      const formData = new FormData();
      formData.append('fileId', uniqueFileId);
      formData.append('file', file);
      // Optional: permissions can be left default (inherits bucket permissions)

      const xhr = new XMLHttpRequest();
      const uploadUrl = `${config.endpoint}/storage/buckets/${config.bucketId}/files`;

      xhr.open('POST', uploadUrl, true);
      xhr.setRequestHeader('X-Appwrite-Project', config.projectId);

      // Track progress
      if (xhr.upload && onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            onProgress(percentComplete);
          }
        };
      }

      xhr.onload = () => {
        try {
          const response = JSON.parse(xhr.responseText || '{}');

          if (xhr.status >= 200 && xhr.status < 300) {
            const fileId = response.$id || uniqueFileId;
            // Public View & Preview URLs according to Appwrite Storage API
            const viewUrl = `${config.endpoint}/storage/buckets/${config.bucketId}/files/${fileId}/view?project=${config.projectId}&mode=admin`;
            const previewUrl = `${config.endpoint}/storage/buckets/${config.bucketId}/files/${fileId}/preview?project=${config.projectId}`;

            resolve({
              success: true,
              fileId,
              url: viewUrl,
              previewUrl,
              name: response.name || file.name,
              size: file.size
            });
          } else {
            // Enhanced Vietnamese Appwrite troubleshooting advice with exact message
            let errorMsg = response.message || 'Lỗi khi tải ảnh lên Appwrite Storage.';
            if (response.type === 'project_not_found' || (response.message && response.message.includes('Project with the requested ID'))) {
              errorMsg = 'Lỗi Appwrite: Project ID "' + config.projectId + '" không tồn tại hoặc sai ký tự. Hãy vào Appwrite Console bấm nút Copy Project ID rồi dán lại.';
            } else if (response.type === 'storage_bucket_not_found' || (response.message && response.message.includes('Bucket with the requested ID'))) {
              errorMsg = 'Lỗi Appwrite: Không tìm thấy Bucket ID "' + config.bucketId + '". Hãy kiểm tra lại ID Bucket trên Appwrite Cloud.';
            } else if (xhr.status === 401 || xhr.status === 403) {
              errorMsg = 'Lỗi Appwrite (' + xhr.status + '): ' + (response.message || 'Bucket chưa cấp quyền tải file. Hãy vào Storage > Bucket > Security > Permissions > Thêm Role "Any" tích Create & Read.');
            }

            reject(new Error(errorMsg));
          }
        } catch (err) {
          reject(new Error('Phản hồi từ Appwrite không hợp lệ: ' + err.message));
        }
      };

      xhr.onerror = () => {
        reject(
          new Error(
            'Không thể kết nối đến máy chủ Appwrite (' +
              config.endpoint +
              '). Vui lòng kiểm tra đường truyền mạng hoặc cấu hình CORS trên Appwrite Console.'
          )
        );
      };

      xhr.send(formData);
    });
  }
};
