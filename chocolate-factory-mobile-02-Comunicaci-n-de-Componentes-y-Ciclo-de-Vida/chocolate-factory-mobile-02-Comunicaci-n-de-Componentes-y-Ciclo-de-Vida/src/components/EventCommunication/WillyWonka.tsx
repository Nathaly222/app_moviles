import { FC, useState } from 'react';
import { OompaLoompaEvent} from "./OompaLoompa.tsx";
import './WillyWonka.css';

// WillyWonka is the parent component that passes the event handler to the OompaLoompa component via props
export const WillyWonkaEvent: FC = () => {
    const [orders, setOrders] = useState<string>("Make more chocolates🍫🍫🍫!");

    const changeOrders = (): void => {
        setOrders("Make more candies 🍭🍭🍭!");
    };

    // let orders = "Make more chocolates 🍫🍫🍫!";
    //
    // const changeOrders = (): void => {
    //     orders = "Make more candies 🍭🍭🍭!";
    // };

    return (
        <div className='background'>
            <h1>Willy Wonka 🔊:</h1>
            <OompaLoompaEvent orders={orders} onOrderChange={changeOrders}/>
            {/*<OompaLoompaEvent orders={orders} onOrderChange={() => setOrders("Make more candies 🍭🍭🍭!")}/>*/}
        </div>
    );
}

