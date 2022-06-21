import axios from 'axios'
import FormData from 'form-data'

/** Upload image to imgur and returns the uploaded image URL
 * 
 * @param imageURL Base64 String URL that represents the image
 * @returns The uploaded image imgur link
 */
async function uploadImage(imageURL) {
  const [type, base64] = imageURL.split(';')[1].split(',')

  const imageFormData = new FormData()
  imageFormData.append('image', base64)
  imageFormData.append('type', type)

  const uploadResponse = await axios.post('https://api.imgur.com/3/upload', imageFormData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: `Client-ID 9dab4a9f9067d57`
      }
    })
    .catch(error => {
      console.error(error)
      throw error
    })
  return uploadResponse.data.data.link
}

module.exports = uploadImage