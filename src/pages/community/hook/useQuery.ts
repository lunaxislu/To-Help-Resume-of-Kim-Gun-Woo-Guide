import { useMutation } from 'react-query';
import { addReply, deleteReply, updateReply } from '../api/ReplyQuery';
import { addPost, deletePost, updatePost } from '../api/commuQuery';

export const useAddPostMutation = () => useMutation(addPost);
export const useDeletePostMutation = () => useMutation(deletePost);
export const useUpdatePostMutation = () => useMutation(updatePost);

export const useUpdateReplyMutation = () => useMutation(updateReply);
export const useAddReplyMutation = () => useMutation(addReply);
export const useDeleteReplyMutation = () => useMutation(deleteReply);
