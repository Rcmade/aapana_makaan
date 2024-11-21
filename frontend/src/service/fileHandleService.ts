class FileHandler {
  public static async handleFile(files: File[]) {
    const newImages: { imgUrl: string }[] = [];

    for (const file of files) {
      // Check if the file is an image (optional, depending on your use case)
      if (file.type.startsWith("image/")) {
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: file.type }); // Create a Blob from the ArrayBuffer
        const imgUrl = URL.createObjectURL(blob); // Create the object URL from the Blob
        newImages.push({
          imgUrl: imgUrl,
        });
      } else {
        console.warn(`${file.name} is not an image file.`);
      }
    }

    return newImages;
  }
}

export default FileHandler
