import request from '@/utils/request';

interface Board {
  id?: string;
  title?: string;
  content?: string;
  thumbnail?: string;
  createStamp?: string;
  lastModifiedStamp?: string;
}
export const getBoardList = (params?: object) => request.get<Board[]>('/boards', params);
export const getBoardById = (id: string) => request.get<Board>(`/boards/${id}`);
export const createBoard = (data: Board) => request.post<Board>('/boards', data);
export const updateBoard = (id: string, data: Board) => request.put<Board>(`/boards/${id}`, data);
export const deleteBoard = (id: string) => request.delete(`/boards/${id}`);
