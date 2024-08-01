import axios from "axios"
import axiosInstance from "./axiosInstance"

const getAllPost = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts`)
    return { success: true, data: res.data.data, message: "Fetch all posts success" }
  } catch (e: any) {
    return { success: false, message: e.message }
  }
}

const getPostById = async (id: string) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/posts/${id}`)
    return { success: true, data: res.data.data, message: "Fetch posts success" }
  } catch (e: any) {
    return { success: false, message: e.message }
  }
}

const getMyPost = async () => {
  try {
    const res = await axiosInstance.get(`/posts/mypost`)
    return { success: true, data: res.data.data, message: "Fetch my posts success" }
  } catch (e: any) {
    return { success: false, message: e.message }
  }
}

const postArticle = async (data: PostProps, user: UserProps) => {
  try {
    const res = await axiosInstance.post(`/posts`,
      JSON.stringify({
        title: data.title,
        body: data.body,
        user: user
      })
    )
    return { success: true, data: res.data.data, message: "Fetch my posts success" }
  } catch (e: any) {
    return { success: false, message: e.message }
  }
}

const updateArticle = async (data: ArticleProps) => {
  try {
    const res = await axiosInstance.patch(`/posts/${data.id}`,
      JSON.stringify({
        title: data.title,
        body: data.body
      })
    )
    return { success: true, data: res.data.data, message: "Fetch my posts success" }
  } catch (e: any) {
    return { success: false, message: e.message }
  }
}

const deleteArticle = async (post_id: string) => {
  try {
    const res = await axiosInstance.delete(`/posts/${post_id}`)
    return { success: true, data: res.data.data, message: "Fetch my posts success" }
  } catch (e: any) {
    return { success: false, message: e.message }
  }
}

export { getAllPost, getPostById, getMyPost, postArticle, updateArticle, deleteArticle }