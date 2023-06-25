import axios from 'axios'

export const upLoadImageCloudinary = async (image) => {
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET)
    const upLoadVideo = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        formData,
    )

    return upLoadVideo.data.url
}
