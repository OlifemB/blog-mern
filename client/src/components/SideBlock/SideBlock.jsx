import React from "react";
import styles from "./SideBlock.module.scss";
import {Typography, Paper, Box} from "@mui/material";

export const SideBlock = ({title, children}) => {
    return (
        <Paper classes={{root: styles.root}}>
            <Typography variant="h6" classes={{root: styles.title}}>
                {title}
            </Typography>

            <Box>
                {children}
            </Box>
        </Paper>
    );
};
