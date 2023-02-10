import React from 'react';
import {Link} from "react-router-dom";
import {ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";

const TagItem = ({name, isLoading}) => {
    return (
        <Link to={`/tags/${name}`}>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon sx={{minWidth: '0'}}>
                        <TagIcon/>
                    </ListItemIcon>

                    {isLoading
                        ? <Skeleton width={'100px'}/>
                        : <ListItemText primary={name}/>
                    }
                </ListItemButton>
            </ListItem>
        </Link>
    );
}

export default TagItem;