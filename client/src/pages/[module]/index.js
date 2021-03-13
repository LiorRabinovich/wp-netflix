import Head from 'next/head'
import { Fragment } from 'react'
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import { MODULES } from '~/consts/MODULES';
import { AppHero } from '~/components/AppHero/AppHero';
import { AppSection } from '~/components/AppSection/AppSection';
import { DefaultLayout } from '~/components/DefaultLayout/DefaultLayout';
import { initializeApollo } from '~/apollo/apollo';
import { GET_MOVIES } from '~/apollo/query/GET_MOVIES';
import { GET_SERIES } from '~/apollo/query/GET_SERIES';

const modulesQuery = { movies: GET_MOVIES, series: GET_SERIES };

export default function List() {
    const router = useRouter();
    const module = router.query.module;

    if (!MODULES.includes(module)) {
        return <DefaultErrorPage statusCode={404} />
    }

    const { data } = useQuery(modulesQuery[module]);
    const { nodes: menuItems } = data.menu.menuItems;
    const { nodes: categories } = data.categories;
    const { title, content, extraPostInfo } = data.postBy;

    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <DefaultLayout menuItems={menuItems}>
                <AppHero title={title} content={content} coverUrl={extraPostInfo.cover.mediaItemUrl} />
                <div className="container">
                    {categories.map((category, categoryIndex) => (
                        category[module].nodes.length ? <AppSection key={categoryIndex} href={`/${module}/category/${category.slug}`} prefixLink={`/${module}`} title={category.name} items={category[module].nodes} /> : null
                    ))}
                </div>
            </DefaultLayout>

        </Fragment>
    )
}

export const getServerSideProps = async ({ params }) => {
    const module = params.module;

    if (!MODULES.includes(module)) {
        return { props: {} }
    }

    const apolloClient = initializeApollo();
    await apolloClient.query({ query: modulesQuery[module] })
    return { props: { initialApolloState: apolloClient.cache.extract() } };
};