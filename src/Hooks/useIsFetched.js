import { useQuery } from "react-query"

export const useIsFetched = (key) => {
  const { isFetched } = useQuery([key], () => {}, {
    enabled: false,
  })

  return isFetched
}
