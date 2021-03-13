import Head from 'next/head'
import { Fragment } from 'react'

import { AppHero } from '~/components/AppHero/AppHero';
import { AppSection } from '~/components/AppSection/AppSection';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '~/apollo/apollo';
import { GET_SERIES } from '~/apollo/query/GET_SERIES';
import { DefaultLayout } from '~/components/DefaultLayout/DefaultLayout';

export default function Series() {
  const { data } = useQuery(GET_SERIES);
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
            category.series.nodes.length ? <AppSection key={categoryIndex} prefixLink={`/series`} title={category.name} items={category.series.nodes} /> : null
          ))}
        </div>
      </DefaultLayout>

    </Fragment>
  )
}

export const getServerSideProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({ query: GET_SERIES });
  return { props: { initialApolloState: apolloClient.cache.extract() } };
};