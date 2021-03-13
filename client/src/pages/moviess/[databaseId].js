import Head from 'next/head'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import DefaultErrorPage from 'next/error'
import { useQuery } from '@apollo/client';

import { AppHero } from '~/components/AppHero/AppHero';
import { AppMediaContent } from '~/components/AppMediaContent/AppMediaContent';
import { initializeApollo } from '~/apollo/apollo';
import { DefaultLayout } from '~/components/DefaultLayout/DefaultLayout';
import { GET_MOVIE } from '~/apollo/query/GET_MOVIE';

export default function Movie() {
    const router = useRouter();
    const databaseId = Number(router.query.databaseId)

    if (!databaseId) {
        return <DefaultErrorPage statusCode={404} />
    }

    const { data } = useQuery(GET_MOVIE, { variables: { databaseId } });
    const { nodes: menuItems } = data.menu.menuItems;

    if (!data.movieBy) {
        return <DefaultErrorPage statusCode={404} />
    }

    const { title, content, extraPostInfo } = data.movieBy;
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
    if (!databaseId) return { props: {} };
    const apolloClient = initializeApollo();
    await apolloClient.query({ query: GET_MOVIE, variables: { databaseId } });
    return { props: { initialApolloState: apolloClient.cache.extract() } };
};