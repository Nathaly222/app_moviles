import {fetchRickAndMorty, rickAndMortyLocalizations} from "../services/rickAndMorty";
import useSWR from 'swr';
import React from 'react';
import AntCard from "../components/AntCard";
import styles from './character.module.css'

interface LocalizationsData {
    results: Array<{
        id: number;
        name: string;
        type:string
    }>;
}

export const Localizations: React.FC = () => {
    const { data, error } = useSWR<LocalizationsData>(rickAndMortyLocalizations, fetchRickAndMorty, {
        suspense: false,
    });

    return (
        <>
            <h1>Localizations</h1>

            <div className={styles.container}>
                {data?.results.map((localizations) => (
                    <AntCard  key={localizations.id} name={localizations.name}  description={localizations.type}></AntCard>
                ))}
            </div>


        </>
    );
};

