import { useQuery } from "react-query"
import axios from "axios"
import { useSelector } from "react-redux"
import { baseApiUrl } from "../Constant"

export const useFetch = (queryKey, url, onSuccess, onError, enable, select, refetchInterval) => {
  const accessToken = useSelector((state) => state.globalState.accessToken)

  return useQuery(
    [queryKey],
    async () => {
      return await axios({
        method: "GET",
        url: `${baseApiUrl}${url}`,
        headers: {
          AUTHORIZATION: `Bearer ${accessToken}`,
        },
      })
        .then((res) => {
          return res; // Return the entire response object
        })
        .catch((err) => {
          return err.response; // Return the entire error response object
        })
    },
    {
      onSuccess,
      onError,
      enabled: enable,
      select: select,
      refetchInterval: refetchInterval,
      refetchOnWindowFocus: false,
    }
  )
}
