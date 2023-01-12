import React from "react";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import {SideBlock} from "./SideBlock/SideBlock";
import {Link} from "react-router-dom";


export const TagsBlock = ({items, isLoading}) => {
    return (
      <SideBlock title="Tags">
          <List>
              {(isLoading ? [...Array(5)] : items).map((name, i) => (
                <Link
                  style={{textDecoration: "none", color: "black"}}
                  to={`/tags/${name}`}
                  key={i}
                >
                    <ListItem key={name + i} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <TagIcon/>
                            </ListItemIcon>
                            {isLoading ? (
                              <Skeleton width={100}/>
                            ) : (
                              <ListItemText primary={name}/>
                            )}
                        </ListItemButton>
                    </ListItem>
                </Link>
              ))}
          </List>
      </SideBlock>
    );
};
