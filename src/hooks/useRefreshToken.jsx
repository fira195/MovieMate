
function useRefreshToken() {

  const refreshToken = async (url) => {
    const options = {
      method: 'POST',
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        
      },
      credentials:'include',
    };
    console.log('token refreshed')  
    try
    {const res=await fetch("http://localhost:3000/api/users/refresh-token", options)
    if (!res.ok) throw Error('Token Expired Login Again');
    const jsonRes=await res.json()
    localStorage.setItem("accessToken", jsonRes?.data?.accessToken)
    return true}
    catch(e) {
        console.log(e)
        return e
  };}
  return {refreshToken};
}
export default useRefreshToken;
