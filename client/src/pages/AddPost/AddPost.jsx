import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {TextField, Paper, Button} from '@mui/material';
import SimpleMDE from 'react-simplemde-editor';
import {useSelector} from "react-redux";
import {useParams, useNavigate, Navigate} from "react-router-dom";
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {selectIsAuth} from "src/redux/user";
import axios from "src/utils/axios";
import {InputTags} from "src/components";
import {useAddPostMutation} from "src/redux";

const AddPost = () => {
    const isAuth = useSelector(selectIsAuth)
    const navigate = useNavigate()
    const [state, setState] = useState({title: '', imageUrl: ''})
    const [tags, setTags] = useState([])
    const [text, setText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const inputFileRef = useRef(null)
    const [newPost, setNewPost] = useState('')
    const [addPost, postData] = useAddPostMutation()

    const {id} = useParams()
    const isEditing = Boolean(id)


    const onChangeSimpleMDE = useCallback((e) => {
        setText(e)
    }, []);

    const options = useMemo(
        () => ({
            spellChecker: false,
            autofocus: true,
            placeholder: 'Enter text...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    useEffect(() => {
        if (isEditing) {
            axios.get(`/posts/${id}`).then(({data}) => {
                setState({title: data.title, imageUrl: data.imageUrl})
                setText(data.text)
                setTags(data.tags)
            }).catch(err => console.warn(err))
        } else {
            setState({title: '', imageUrl: ''})
            setTags([])
            setText('')
        }
    }, [isEditing])

    const handleAddPost = async () => {
        const fields = {
            title: state.title,
            text: text,
            tags: tags,
            imageUrl: state.imageUrl,
        }
        if (newPost) {
            await addPost(fields).unwrap()
        }
    }


    const handleChangeFile = async (e) => {
        try {
            const formData = new FormData()
            const file = e.target.files[0]
            formData.append('image', file)
            const {data} = await axios.post('/uploads', formData)
            setState({...state, imageUrl: data.url})
        } catch (err) {
            console.log(err)
        }
    };

    const handleCratePost = async () => {
        try {
            setIsLoading(true)

            const fields = {
                title: state.title,
                text: text,
                tags: tags,
                imageUrl: state.imageUrl,
            }
            const {data} = await axios.post('/posts', fields)

            setIsLoading(false)
            navigate(`/posts/${data._id}`)
        } catch (err) {
            console.warn(err)
        }
    }

    const handleUpdatePost = async () => {
        try {
            setIsLoading(true)

            const fields = {
                title: state.title,
                text: text,
                tags: tags,
                imageUrl: state.imageUrl,
                updatedAt: new Date()
            }

            console.log(fields)

            const {data} = await axios.patch(`/posts/${id}`, fields)

            setIsLoading(false)
            navigate(`/posts/${id}`)
        } catch (err) {
            console.warn(err)
        }
    }


    if (!window.localStorage.getItem('token') && !isAuth)
        return <Navigate to={"/"}/>

    return (
        <Paper style={{padding: 30}}>
            <form>
                <Button
                    onClick={() => inputFileRef.current.click()}
                    variant="outlined"
                    size="large"
                >
                    Add Preview
                </Button>

                <input
                    ref={inputFileRef}
                    type="file"
                    accept='.png, .jpg, .jpeg'
                    onChange={handleChangeFile}
                    hidden
                />

                {state.imageUrl && (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setState({...state, imageUrl: ''})}
                    >
                        Удалить
                    </Button>
                )}

                {state.imageUrl && (
                    <img
                        className={styles.image}
                        src={`http://localhost:5000${state.imageUrl}`}
                        alt="Uploaded"
                    />
                )}

                <br/>
                <br/>

                <TextField
                    classes={{root: styles.title}}
                    value={state.title}
                    onChange={(e) => setState({...state, title: e.target.value})}
                    variant="standard"
                    placeholder="Post Title..."
                    fullWidth={true}
                />


                <InputTags tags={tags} setTags={setTags}/>

                <SimpleMDE
                    className={styles.editor}
                    value={text}
                    onChange={(e) => onChangeSimpleMDE(e)}
                    options={options}
                />

                <div className={styles.buttons}>
                    <Button
                        onClick={isEditing ? handleUpdatePost : handleCratePost}
                        size="large"
                        variant="contained"
                    >
                        {isEditing ? 'Save' : 'Create'}
                    </Button>


                    <Button
                        onClick={() => navigate(`/posts/${id}`)}
                        size="large"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Paper>
    );
};

export default AddPost