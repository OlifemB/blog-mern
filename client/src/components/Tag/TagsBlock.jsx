import React from "react";
import {SideBlock} from "../SideBlock/SideBlock";
import {List} from "@mui/material";
import TagItem from "./TagItem";


export default function TagsBlock({tags, isLoading}) {

    return (
        <SideBlock title="Tags">
            <List>
                {isLoading
                    ? [...Array(5)].map((item, index) =>
                        <TagItem
                            isLoading={true}
                            key={`tag-${index}`}
                        />
                    )
                    : tags.map(name =>
                        <TagItem
                            name={name}
                            isLoading={false}
                            key={name}
                        />
                    )
                }
            </List>
        </SideBlock>
    )
}
