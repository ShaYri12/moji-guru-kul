import axios from 'axios'

export const getS3PreSignedUrl = async (fileName: string) => {
  return (await axios.get(`https://devapi.nukulum.com/api/buckets/generate-preSignedUrl/neith-materials/${fileName}`)).data
}

export const uploadFileToS3 = async ({ url, file }: { url: string; file: any }) => {
  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: file,
  })
  return url.split('?')[0]
}
