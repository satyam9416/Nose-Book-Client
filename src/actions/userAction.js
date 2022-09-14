import API from "../API/API";

export const getUser = async(userId) => {
    try {
        const { data } = await API.get(`user/${userId}`)
        return data
    } catch (error) {
        console.log(error)
    }
}