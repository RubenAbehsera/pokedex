import {FunctionComponent} from "react";

interface TitleProps {
    title: string;
}

export const Title: FunctionComponent<TitleProps> = ({ title }: TitleProps) =>  (
    <h1 className="red"> {title}</h1>
);