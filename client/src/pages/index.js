import Head from 'next/head'
import { Fragment } from 'react'

import { AppHero } from '~/components/AppHero/AppHero';
import { AppSection } from '~/components/AppSection/AppSection';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '~/apollo/apollo';
import { GET_HOME } from '~/apollo/query/GET_HOME';
import { DefaultLayout } from '~/components/DefaultLayout/DefaultLayout';

export default function Home() {
  const { data } = useQuery(GET_HOME);
  const { nodes: menuItems } = data.menu.menuItems;
  const { nodes: moviesItems } = data.movies;
  const { nodes: seriesItems } = data.series;
  const { title, content, extraPostInfo } = data.pageBy;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultLayout menuItems={menuItems}>
        <AppHero title={title} content={content} coverUrl={extraPostInfo.cover.mediaItemUrl} />
        <div className="container">
          <AppSection prefixLink="/movies" title="סרטים מומלצים בנטפליקס" items={moviesItems} />
          <AppSection prefixLink="/series" title="סדרות מומלצים בנטפליקס" items={seriesItems} />
        </div>
      </DefaultLayout>

    </Fragment>
  )
}

export const getServerSideProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({ query: GET_HOME });
  return { props: { initialApolloState: apolloClient.cache.extract() } };
};