
export const imageUpload = async (images) => {
    console.log(1111111, images);
    let imgArr = [];
    for (const item of images) {
        const formData = new FormData()
        formData.append("file", item)
        formData.append("upload_preset", "bjcwnnri")
        formData.append("cloud_name", "loc120299")

        const res = await fetch("https://api.cloudinary.com/v1_1/loc120299/image/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        imgArr.push({ public_id: data.public_id, url: data.secure_url })
    }
    return imgArr;
}