import axios from "axios"

const loginService = async (data: UserLogin) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
      JSON.stringify({
        user: {
          email: data.email,
          password: data.password
        }
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
      }
    );
    console.log(res.status);
    if (res.status === 200) {
      return { success: true, message: "Login successful", data: res.data.status }
    }
  } catch (e: any) {
    console.log(e)
    return { success: false, message: e.message }
  }
}

const signupService = async (data: UserLogin) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`,
      JSON.stringify({
        user: {
          email: data.email,
          password: data.password,
          name: "test"
        }
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(res.status)
    if (res.status === 200) {
      localStorage.setItem('user', JSON.stringify({
        name: res.data.status.data.name,
        email: res.data.status.data.email
      }))
      localStorage.setItem('authorization', res.data.status.token)
      return { success: true, message: "Login successful" }
    }
  } catch (e: any) {
    console.log(e)
    return { success: false, message: e.message }
  }
}

const logoutService = async () => {
  const autho = localStorage.getItem("authorization")
  try {
    if (autho) {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
        headers: {
          Authorization: `Bearer ${autho}`
        }
      })
      if (res.status === 200) {
        localStorage.removeItem("authorization")
        localStorage.removeItem("user")
      }
    }
  } catch (e: any) {
    console.log(e.message)
  }
}
export { loginService, signupService, logoutService }