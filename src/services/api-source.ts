import { TagType } from '../types/tags';

class Api {
  async fetchFollowers(page: number = 1): Promise<any> {
    return fetch(
      `https://avl-frontend-exam.herokuapp.com/api/users/all?page=${page}&pageSize=20`,
    ).then((response) => response.json());
  }

  async fetchFollowings(page: number = 1): Promise<any> {
    return fetch(
      `https://avl-frontend-exam.herokuapp.com/api/users/friends?page=${page}&pageSize=20`,
    ).then((response) => response.json());
  }

  async fetchSearchResults(
    { page = 1, pageSize = 3, keyword = '' }
      : { page?: number, pageSize: number, keyword: string }
  ): Promise<any> {
    return fetch(
      `https://avl-frontend-exam.herokuapp.com/api/users/all?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
    ).then((response) => response.json());
  }

  async fetchTags(): Promise<TagType[]> {
    return fetch('https://avl-frontend-exam.herokuapp.com/api/tags').then(
      (response) => response.json(),
    );
  }
}

export default new Api();
