import styles from './InputTags.module.scss'

export const InputTags = (props) => {
    const {tags, setTags} = props


    const handleKeyDown = (e) => {
        const tag = e.target.value.trim().replaceAll(' ', '_')

        if (e.key !== 'Enter' || tags.includes(tag))
            return

        setTags([...tags, tag])
        e.target.value = ''
    }


    const handleRemove = (index) => {
        setTags(tags.filter((el, i) => i !== index))
    }


    return (
        <div className={styles['tags-input-container']}>
            {tags.map((tag, index) => (
                <div className={styles["tag-item"]} key={index}>
                    <span className={styles["text"]}>{tag}</span>

                    <span
                        className={styles["close"]}
                        onClick={() => handleRemove(index)}
                    >
                        &times;
                    </span>
                </div>
            ))}

            <input
                onKeyDown={handleKeyDown}
                type="text"
                className={styles["tags-input"]}
                placeholder="Tags..."
            />
        </div>
    )
}