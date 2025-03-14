import { useMutation } from "react-query"
import axios from "axios"
import { baseApiUrl } from "services/baseUrl"
import { useSelector } from "react-redux"

export const useMediaMutate = (queryKey, url, type, onSuccess, onError) => {
  const accessToken = useSelector((state) => state.globalState.accessToken)

  return useMutation(
    [queryKey],
    async (data) => {
      let myFormData = new FormData()

      if (type === "image") {
        myFormData.append("image", data)
      } else if (type === "video") {
        myFormData.append("video", data)
      } else if (type === "audio") {
        myFormData.append("audio", data, "audio.webm")
      } else if (type === "file") {
        myFormData.append("file", data)
      } else if (type === "pdf") {
        myFormData.append("pdf", data)
      }

      myFormData.append("type", type)

      return await axios({
        method: "POST",
        url: `${baseApiUrl}${url}`,
        data: myFormData,
        processData: false,
        contentType: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
          AUTHORIZATION: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        return res.data
      })
    },
    {
      onSuccess,
      onError,
    }
  )
}
