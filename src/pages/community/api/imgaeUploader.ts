import ReactQuill from 'react-quill';
import { v4 as uuid } from 'uuid';
import { supabase } from '../../../api/supabase/supabaseClient';
import FileResizer from 'react-image-file-resizer';
export const quillImageHandler = (
  quillRef: React.MutableRefObject<ReactQuill | null>,
  setFormValues: (
    value: React.SetStateAction<{
      title: string;
      category: string;
      files: [];
      content: string;
      uploadedFileUrl: [];
      anon: boolean;
      mainImage: string;
      post_color: boolean;
    }>
  ) => void
) => {
  try {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const file = input.files![0];
      const fileNewName = uuid();
      // png를 webp로 바꾸는 함수
      const resizeFile = (file: File) =>
        new Promise((res) => {
          FileResizer.imageFileResizer(
            file,
            1500,
            1500,
            'WEBP',
            20,
            0,
            (uri) => res(uri),
            'file'
          );
        });
      const resize = await resizeFile(file);
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`quill_imgs/${fileNewName}.webp`, resize as File);

      if (error) {
        console.error('이미지 업로드 중 오류 발생:', error);
      } else {
        console.log('이미지가 성공적으로 업로드되었습니다:', data);

        const response = supabase.storage
          .from('images')
          .getPublicUrl(`quill_imgs/${fileNewName}.webp`, {
            transform: {
              width: 400,
              resize: 'contain',
              format: 'origin'
            }
          });
        console.log(response);

        if (response.data) {
          const postImageUrl = response.data.publicUrl;
          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection();
          editor?.insertEmbed(range?.index || 0, 'image', postImageUrl);
          setFormValues((prevValues) => ({
            ...prevValues,
            mainImage: postImageUrl
          }));
          console.log('이미지 URL을 성공적으로 가져왔습니다.');
        } else {
          console.error('No public URL found in response data.');
        }
      }
    });
  } catch (error) {
    console.log('error', error);
  }
};
