import React from 'react';
import Head from "next/head";
interface HeadProps {
    title: string
    description: string
}
const HeadComponent: React.FC<HeadProps> = ( {title, description} ) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
    );
};

export default HeadComponent;