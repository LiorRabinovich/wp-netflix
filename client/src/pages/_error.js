import Head from 'next/head'
import { Fragment } from 'react';

import { AppHero } from '~/components/AppHero/AppHero';
import { AppSection } from '~/components/AppSection/AppSection';
import { DefaultLayout } from '~/components/DefaultLayout/DefaultLayout';

function Error({ title, statusCode, menuItems = [] }) {
    return (
        <Fragment>
            <Head>
                <title>{title} - {statusCode}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <DefaultLayout menuItems={menuItems}>
                {title}
            </DefaultLayout>
        </Fragment>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error