import {ApolloClient, gql, InMemoryCache} from '@apollo/client';
import {VideoType} from './VideoTypes';
export default async function fetchVideoList(pageNo:number,pageSize:number): Promise<VideoType[]> {  
  const client = new ApolloClient({
    uri: 'https://strapi.carema.app/graphql',
    cache: new InMemoryCache({resultCaching: false}),
  });
  const result = await client.query({
    variables: {
      page: pageNo,
      pageSize: pageSize,
    },
    query: gql(`query getVideoList($page: Int!, $pageSize: Int!) {
        homeScreenVideos(pagination: { page: $page, pageSize: $pageSize }) {
          data {
            id
            attributes {
              Title_En
              Title_Ar
              publishedAt
              saleor_product_id
              mux_video_uploader_mux_asset {
                data {
                  id
                  attributes {
                    playback_id
                    aspect_ratio
                  }
                }
              }
            }
          }
          meta {
            pagination {
              page
              pageSize
              total
              pageCount
            }
          }
        }
      }
      `),
  });
  const videos = result.data.homeScreenVideos.data.map((e: any) => {
    return {
      videoId:e.id,
      title: e.attributes.Title_En,
      playbackUrl: buildUrl(
        e.attributes.mux_video_uploader_mux_asset.data.attributes.playback_id,
      ),
      aspectRatio: aspectRatio(
        e.attributes.mux_video_uploader_mux_asset.data.attributes.aspect_ratio,
      ),
      thumbnailUrl: buildThumbnain(
        e.attributes.mux_video_uploader_mux_asset.data.attributes.playback_id,
      ),
    } as VideoType;
  });  
  return videos;
}

const aspectRatio = (ratio: string) => {
  const [numerator, denominator] = ratio
    .split(':')
    .map(e => parseInt(e.trim()));
  return numerator / denominator;
};

const buildUrl = (id: string) => {
  return `https://stream.mux.com/${id}.m3u8`;
};
const buildThumbnain = (id: string) => {
  return `https://image.mux.com/${id}/thumbnail.png?time=0`;
};
