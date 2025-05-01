export const getDownloadSize = async (url:string) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const contentLength = response.headers.get('Content-Length');
  
      if (contentLength) {
        const sizeInBytes = parseInt(contentLength, 10);
        const sizeInMB = sizeInBytes / (1024 * 1024);
        return sizeInMB;
      } else {
        console.warn('No Content-Length header found');
        return null;
      }
    } catch (error) {
      console.error('Error checking image size:', error);
      return null;
    }
};