import useFetchData from "./useFetch";

function useRefreshToken( ) {
  const { fetchData } = useFetchData();

  const refreshToken = (url, options) => {
    fetchData("http://localhost:3000/users/refresh-token", "post", options)
      .then((res) => {
        console.log(res);
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then((res) => localStorage.setItem("accessToken", res.data.accessToken))
      .then(()=>{return true})
      .catch((e) => {
        console.log(e)
        return false
        });
  };
  return {refreshToken};
}
export default useRefreshToken;
