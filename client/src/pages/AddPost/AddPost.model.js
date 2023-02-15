

export const addPost = async ({title, text, tags, imageUrl}) => {
    try {

        const fields = {
            title: title,
            text: text,
            tags: tags,
            imageUrl: imageUrl,
        }

        const {data} = await axios.post('/posts', fields)

        return data._id
    } catch (err) {
        return err
    }
}

export const updatePost = async ({id, title, text, tags, imageUrl}) => {
    try {

        const fields = {
            title: title,
            text: text,
            tags: tags,
            imageUrl: imageUrl,
        }

        const {data} = await axios.patch(`/posts/${id}`, fields)

        return id
    } catch (err) {
        return err
    }
}