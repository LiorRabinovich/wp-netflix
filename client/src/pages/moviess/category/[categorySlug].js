import Head from 'next/head'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import DefaultErrorPage from 'next/error'
import { useQuery } from '@apollo/client';

import { AppHero } from '~/components/AppHero/AppHero';
import { AppSection } from '~/components/AppSection/AppSection';
import { initializeApollo } from '~/apollo/apollo';
import { DefaultLayout } from '~/components/DefaultLayout/DefaultLayout';
import { GET_CATEGORY_MOVIE } from '~/apollo/query/GET_CATEGORY_MOVIES';

export default function MovieCategory() {
    const router = useRouter();
    const categorySlug = router.query.categorySlug;

    if (!categorySlug) {
        return <DefaultErrorPage statusCode={404} />
    }

    const { data } = useQuery(GET_CATEGORY_MOVIE, { variables: { categorySlug } });
    const { nodes: menuItems } = data.menu.menuItems;

    if (!data.category.movies.nodes.length) {
        return <DefaultErrorPage statusCode={404} />
    }

    const { name, movies } = data.category;
    const { title, content, extraPostInfo } = data.postBy;
    const { mediaItemUrl: coverUrl } = extraPostInfo.cover;

    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <DefaultLayout menuItems={menuItems}>
                <AppHero title={title} content={content} coverUrl={coverUrl} />
                <div className="container">
                    <AppSection href="movies" prefixLink={`/movies`} title={name} items={movies.nodes} />
                </div>
            </DefaultLayout>

        </Fragment>
    )
}

export const getServerSideProps = async ({ params }) => {
    const categorySlug = params.categorySlug;
    const apolloClient = initializeApollo();
    await apolloClient.query({ query: GET_CATEGORY_MOVIE, variables: { categorySlug } });
    return { props: { initialApolloState: apolloClient.cache.extract() } };
};