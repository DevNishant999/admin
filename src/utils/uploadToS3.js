export const uploadToS3 = async (file, apiUrl) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(`${apiUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      return { url: data.url };
    } else {
      return { error: "Upload failed" };
    }
  } catch (err) {
    console.error("Upload error:", err);
    return { error: "Image upload failed" };
  }
};
