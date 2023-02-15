import React, {useState, useMemo} from 'react'
import {Box, Container, Grid} from "@mui/material";


const render = {
    count1: 0,
    count2: 0
}
const Count = React.memo(({id, value}) => {
    console.log(`Count ${id} render: ${++render[`count${id}`]}`)

    return (
        <div>
            <h1>{value}</h1>
        </div>
    )
})


let renderCount = 0
const IsFive = React.memo(({value}) => {
        console.log(`isFive render: ${++renderCount}`)

        const getResult = () => {
            let i = 0;
            while (i < 600000000) i++;
            return value === 5 ? 'is five' : ' no  five'
        }

        return <h3>{getResult}</h3>
    },
    (prevProps, nextProps) => {
        return nextProps.value !== 5;
    })


const Test = () => {
    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)

    return (
        <Container>
            <Box>
                <h5>Counter 1</h5>
                <div className={'counter'}>
                    <button onClick={() => setCount1(count1 + 1)}>+</button>
                    <Count id={1} value={count1}/>
                </div>
            </Box>

            <Box>
                <h5>Counter 2</h5>
                <div className={'counter'}>
                    <button onClick={() => setCount2(count2 + 1)}>+</button>
                    <Count id={2} value={count2}/>
                    <IsFive value={count2}/>
                </div>
            </Box>
        </Container>
    )
}

export default Test