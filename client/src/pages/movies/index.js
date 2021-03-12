import Head from 'next/head'
import { Fragment } from 'react'

import { AppHero } from '~/components/AppHero/AppHero';
import { AppSection } from '~/components/AppSection/AppSection';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '~/apollo/apollo';
import { GET_MOVIES } from '~/apollo/query/GET_MOVIES';
import { DefaultLayout } from '~/components/DefaultLayout/DefaultLayout';

export default function Movies() {
  const { data } = useQuery(GET_MOVIES);
  const { nodes: menuItems } = data.menu.menuItems;
  const { nodes: categories } = data.categories;
  const { title, content, extraPostInfo } = data.pageBy;

  console.log(data);

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultLayout menuItems={menuItems}>
        <AppHero title={title} content={content} coverUrl={extraPostInfo.cover.mediaItemUrl} />
        <div className="container container--sm">
          {categories.map((category, categoryIndex) => (
            category.movies.nodes.length ? <AppSection key={categoryIndex} prefixLink={`/movies`} title={category.name} items={category.movies.nodes} /> : null
          ))}
        </div>
      </DefaultLayout>

    </Fragment>
  )
}

export const getServerSideProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({ query: GET_MOVIES });
  return { props: { initialApolloState: apolloClient.cache.extract() } };
};