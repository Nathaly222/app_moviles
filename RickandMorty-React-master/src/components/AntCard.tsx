import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

type CardType = {
    name:string,
    image?:string,
    description:string
}

const AntCard:React.FC<CardType> = ({name,image, description}:CardType) => (
    <Card
        style={{ width: 200 }}
        cover={
            <img
                alt="example"
                src={image}
            />
        }
        actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
        ]}
    >
        <Meta
            title={name}
            description={description}
        />
    </Card>
);

export default AntCard;
