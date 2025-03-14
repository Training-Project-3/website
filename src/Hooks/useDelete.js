import { useMutation } from "react-query"
import axios from "axios"
import { useSelector } from "react-redux"
import { baseApiUrl } from "../constant"

export const useDelete = (queryKey, url, onSuccess, onError, enable, select) => {
  const accessToken = useSelector((state) => state.globalState.accessToken)

  return useMutation(
    [queryKey],
    async (id) => {
      return await axios({
        method: "DELETE",
        url: `${baseApiUrl}${url}${id}`,
        headers: {
          AUTHORIZATION: `Bearer ${accessToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      }).then((res) => {
        return res.data
      })
    },
    {
      onSuccess,
      onError,
      enabled: enable,
      select: select,
      refetchOnWindowFocus: false,
    }
  )
}
