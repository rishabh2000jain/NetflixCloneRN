import {axiosClient} from '../../util/NetworkClient';
import {apiEndpoints} from '../../util/NetworkEndpoints';
import {ApiResponseType} from '../../util/ApiResponse';
import axios, {AxiosError} from 'axios';
export const searchMovieByTitle = async (
  title: string,
  page: number,
): Promise<ApiResponseType> => {
  try {
    const response = await axiosClient.get(apiEndpoints.searchByTitle, {
      params: {
        s: title,
        page,
      },
    });
    if(response.data.Response == 'True'){
        return {success: response.data.Search};
    }else{
        return {success: []};
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return {
        error: {
          code: error.code,
          message: error.message,
          data: error.response?.data,
        },
      };
    } else {
        return {
            error: {
              message: error.message,
              data: error.response?.data,
            },
          };
    }
  }
};
