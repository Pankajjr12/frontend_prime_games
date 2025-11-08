export const uploadToCloudinary = async (pics: File) => {
    try {
      if (!pics) return null;
  
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ml_default"); // Must match Cloudinary preset name
      data.append("cloud_name", "dxlkhiepo");
  
      const res = await fetch(`https://api.cloudinary.com/v1_1/dxlkhiepo/image/upload`, {
        method: "POST",
        body: data,
      });
  
      const fileData = await res.json();
  
      if (fileData.secure_url) {
        return fileData.secure_url;
      } else {
        console.error("Cloudinary error:", fileData);
        return null;
      }
  
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    }
  };
  