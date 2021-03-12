import Head from 'next/head'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client';

import { AppHero } from '~/components/AppHero/AppHero';
import { AppMediaContent } from '~/components/AppMediaContent/AppMediaContent';
import { initializeApollo } from '~/apollo/apollo';
import { DefaultLayout } from '~/components/DefaultLayout/DefaultLayout';
import { GET_SERIE } from '~/apollo/query/GET_SERIE';

export default function Serie(props) {
    const router = useRouter();
    const databaseId = Number(router.query.databaseId)
    const { data } = useQuery(GET_SERIE, { variables: { databaseId } });
    const { nodes: menuItems } = data.menu.menuItems;
    const { title, content, extraPostInfo } = data.serieBy;
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
    const apolloClient = initializeApollo();
    await apolloClient.query({ query: GET_SERIE, variables: { databaseId } });
    return { props: { initialApolloState: apolloClient.cache.extract() } };
};