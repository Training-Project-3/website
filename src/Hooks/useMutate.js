import { useMutation } from "react-query"
import axios from "axios"
import { useSelector } from "react-redux"
import { baseApiUrl } from "../Constant"

export const useMutate = (queryKey, url, onSuccess, onError, select) => {
  const accessToken = useSelector((state) => state.globalState.accessToken)

  return useMutation(
    [queryKey],
    async (data) => {
      return await axios({
        method: "POST",
        url: `${baseApiUrl}${url}`,
        data: data,
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
      select: select,
    }
  )
}
