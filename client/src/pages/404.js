import Head from 'next/head'
import { Fragment } from 'react';

import { AppHero } from '~/components/AppHero/AppHero';
import { AppSection } from '~/components/AppSection/AppSection';
import { DefaultLayout } from '~/components/DefaultLayout/DefaultLayout';

export default function Custom404({ menuItems = [] }) {
    return (
        <Fragment>
            <Head>
                <title>404</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <DefaultLayout menuItems={menuItems}>
                404
            </DefaultLayout>

        </Fragment>
    )
}