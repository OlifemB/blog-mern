import React from "react";

import {SideBlock} from "../SideBlock/SideBlock";
import CommentList from "./CommentList";


export const CommentBlock = ({comments, children, isLoading}) => {
    return (
        <SideBlock title="Comments">
            <CommentList comments={comments} isLoading={isLoading}/>
            {children}
        </SideBlock>
    );
};
