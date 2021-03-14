import Head from 'next/head'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import DefaultErrorPage from 'next/error'
import { useQuery } from '@apollo/client';

import { MODULES } from '~/consts/MODULES';
import { AppHero } from '~/components/AppHero/AppHero';
import { CardsList } from '~/components/CardsList/CardsList';
import { DefaultLayout } from '~/components/DefaultLayout/DefaultLayout';
import { initializeApollo } from '~/apollo/apollo';
import { GET_CATEGORY_MOVIES } from '~/apollo/query/GET_CATEGORY_MOVIES';
import { GET_CATEGORY_SERIES } from '~/apollo/query/GET_CATEGORY_SERIES';

const modulesQuery = { movies: GET_CATEGORY_MOVIES, series: GET_CATEGORY_SERIES };

export default function Category() {
    const router = useRouter();
    const module = router.query.module;
    const categorySlug = router.query.categorySlug;

    if (!(categorySlug && MODULES.includes(module))) {
        return <DefaultErrorPage statusCode={404} />
    }

    const { data } = useQuery(modulesQuery[module], { variables: { slug: categorySlug, pageSlug: `series-category-${categorySlug}` } });
    console.log(data)
    const { nodes: menuItems } = data.menu.menuItems;

    if (!data.categories.nodes[0][module].nodes.length) {
        return <DefaultErrorPage statusCode={404} />
    }

    const { name } = data.categories.nodes[0];
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
                    <CardsList prefixLink={`/${module}`} items={data.categories.nodes[0][module].nodes} />
                </div>
            </DefaultLayout>

        </Fragment>
    )
}

export const getServerSideProps = async ({ params }) => {
    const categorySlug = params.categorySlug;
    const module = params.module;

    if (!(categorySlug && MODULES.includes(module))) {
        return { props: {} }
    }

    const apolloClient = initializeApollo();
    await apolloClient.query({ query: modulesQuery[module], variables: { slug: categorySlug, pageSlug: `${module}-category-${categorySlug}` } });
    return { props: { initialApolloState: apolloClient.cache.extract() } };
};