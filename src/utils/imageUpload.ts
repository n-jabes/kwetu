// Cloudinary image upload utility
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET || 'kwetu_profile');
  
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) {
      throw new Error('Failed to upload image');
    }
    
    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
};

// Fallback to base64 if Cloudinary fails
export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Main upload function with fallback
export const uploadImageToService = async (file: File): Promise<string> => {
  try {
    // Try Cloudinary first
    return await uploadImageToCloudinary(file);
  } catch (error) {
    console.warn('Cloudinary upload failed, falling back to base64:', error);
    // Fallback to base64
    return convertImageToBase64(file);
  }
};
