import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {TextField, Paper, Button} from '@mui/material';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "../../axios";

export const AddPost = () => {
    const isAuth = useSelector(selectIsAuth)
    const navigate = useNavigate()
    const [state, setState] = useState({title: '', tags: '', imageUrl: ''})
    const [text, setText] = useState('')
    const [isLoading, setLoading] = useState(false)
    const inputFileRef = useRef(null)

    const {id} = useParams()
    const isEditing = Boolean(id)


    const onChangeSimpleMDE = useCallback((e) => {
        setText(e)
    }, []);

    const options = useMemo(
      () => ({
          spellChecker: false,
          maxHeight: '400px',
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
                setState({title: data.title, tags: data.tags.join(' '), imageUrl: data.imageUrl})
                setText(data.text)
            }).catch(err => console.warn(err))
        } else {
            setState({title: '', tags: '', imageUrl: ''})
            setText('')
        }
    }, [isEditing])


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

    const onSubmit = async () => {
        try {
            setLoading(true)

            const fields = {
                title: state.title,
                text: text,
                tags: state.tags,
                imageUrl: state.imageUrl
            }

            const {data} = isEditing
              ? await axios.patch(`/posts/${id}`, fields)
              : await axios.post('/posts', fields)

            const _id = isEditing ? id : data._id

            navigate(`/posts/${_id}`)
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
                fullWidth
              />

              <TextField
                classes={{root: styles.tags}}
                value={state.tags}
                onChange={(e) => setState({...state, tags: e.target.value})}
                variant="standard"
                placeholder="Tags"
                fullWidth
              />

              <SimpleMDE
                className={styles.editor}
                value={text}
                onChange={(e) => onChangeSimpleMDE(e)}
                options={options}
              />

              <div className={styles.buttons}>
                  <Button
                    onClick={onSubmit}
                    size="large"
                    variant="contained"
                  >
                      {isEditing ? 'Save' : 'Create'}
                  </Button>

                  <a href="/">
                      <Button size="large">
                          Cancel
                      </Button>
                  </a>
              </div>
          </form>
      </Paper>
    );
};
