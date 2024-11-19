import React from 'react';
import { Card, Divider, CardContent, Typography, Button, CardActions, CardMedia } from '@mui/material';

interface CardComponentProps {
    image: string;
    title: string;
    description: string;
}

const CardComponent: React.FC<CardComponentProps> = ({ image, title, description }) => {
    return (
        <Card sx={{ maxWidth: 345, borderWidth: 1, borderRadius: 'lg', boxShadow: 3 }}>
            <CardMedia
                component="img"
                height="140"
                image={image}
                alt={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" color="teal.500">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <Divider />
            <CardActions>
                <Button size="small" color="primary">
                    Buy bunnies
                </Button>
                <Button size="small" color="secondary">
                    Add bunny
                </Button>
            </CardActions>
        </Card>
    );
};

export default CardComponent;
