import React from 'react';
import { Card } from 'antd';

interface CardProps {
    title: string;
    description: string;
    imageUrl:string;
}

const CardComponent: React.FC<CardProps> = ({ title, description, imageUrl }) => {
    return (
        <Card 
        hoverable
        style= {{ width:240}}
        cover= {<img alt="jj" src={imageUrl}/> }
        >
            <Card.Meta title={title} description={description}/>
        </Card>
    );
};
export default CardComponent;