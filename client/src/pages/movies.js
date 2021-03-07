import Head from 'next/head'
import { Fragment } from 'react'

import { IndexHero } from '~/components/AppHero/IndexHero';
import { AppSection } from '~/components/AppSection/AppSection';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '~/apollo/apollo';
import { GET_MENU } from '~/apollo/query/GET_MENU';
import { DefaultLayout } from '~/components/DefaultLayout/DefaultLayout';

const Movies = [0, 0, 0, 0, 0, 0, 0, 0, 0];

export default function Home() {
  const { data } = useQuery(GET_MENU);
  const { nodes: menuItems } = data.menu.menuItems;

  return (
    <Fragment>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <DefaultLayout menuItems={menuItems}>
        <IndexHero />
        <div className="container">
          <AppSection title="סרטים מומלצים בנטפליקס" items={Movies} />
          <AppSection title="סדרות מומלצים בנטפליקס" items={Movies} />
        </div>
      </DefaultLayout>

    </Fragment>
  )
}

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({ query: GET_MENU });
  return { props: { initialApolloState: apolloClient.cache.extract() } };
};