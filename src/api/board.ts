import request from '@/utils/request';

interface BoardDto {
  name: string;
}
export const getBoardList = (params?: object) => request.get('/boards', params);
export const getBoardById = (id: string) => request.get(`/boards/${id}`);
export const createBoard = (data: BoardDto) => request.post('/boards', data);
export const updateBoard = (id: string, data: BoardDto) => request.put(`/boards/${id}`, data);
export const deleteBoard = (id: string) => request.delete(`/boards/${id}`);
