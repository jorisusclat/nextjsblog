import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilscss from '../../scss/utils.module.scss';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: true,
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilscss.headingXl}>{postData.title}</h1>
        <div className={utilscss.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
