const generateImage = async () => {
  const prompt = imgPrompt || "Viral YouTube thumbnail vibrant colorful Gen-Z style";
  setImgLoading(true);
  setGenImg(null);
  try {
    const res = await fetch("/api/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    if (data.imageUrl) {
      setGenImg(data.imageUrl);
    } else {
      setGenImg("ERROR");
    }
  } catch {
    setGenImg("ERROR");
  }
  setImgLoading(false);
};