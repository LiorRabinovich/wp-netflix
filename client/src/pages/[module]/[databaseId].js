import Head from 'next/head'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import DefaultErrorPage from 'next/error'
import { useQuery } from '@apollo/client';

import { MODULES } from '~/consts/MODULES';
import { AppHero } from '~/components/AppHero/AppHero';
import { AppMediaContent } from '~/components/AppMediaContent/AppMediaContent';
import { DefaultLayout } from '~/components/DefaultLayout/DefaultLayout';
import { initializeApollo } from '~/apollo/apollo';
import { GET_MOVIE } from '~/apollo/query/GET_MOVIE';
import { GET_SERIE } from '~/apollo/query/GET_SERIE';

const modulesQuery = { movies: GET_MOVIE, series: GET_SERIE };
const modulePath = { movies: 'movieBy', series: 'serieBy' };

export default function Single() {
    const router = useRouter();
    const module = router.query.module;
    const databaseId = Number(router.query.databaseId)

    if (!(databaseId && MODULES.includes(module))) {
        return <DefaultErrorPage statusCode={404} />
    }

    const { data } = useQuery(modulesQuery[module], { variables: { databaseId } });
    const { nodes: menuItems } = data.menu.menuItems;

    if (!data[modulePath[module]]) {
        return <DefaultErrorPage statusCode={404} />
    }

    const { title, content, extraPostInfo } = data[modulePath[module]];
    const { trailer, cover, description } = extraPostInfo;
    const { mediaItemUrl: coverUrl } = cover;

    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <DefaultLayout menuItems={menuItems}>
                <AppHero title={title} content={description} coverUrl={coverUrl} />
                <div className="container">
                    <AppMediaContent trailer={trailer} content={content} />
                </div>
            </DefaultLayout>

        </Fragment>
    )
}

export const getServerSideProps = async ({ params }) => {
    const databaseId = Number(params.databaseId);
    const module = params.module;

    if (!(databaseId && MODULES.includes(module))) {
        return { props: {} }
    }

    const apolloClient = initializeApollo();
    await apolloClient.query({ query: modulesQuery[module], variables: { databaseId } });
    return { props: { initialApolloState: apolloClient.cache.extract() } };
};