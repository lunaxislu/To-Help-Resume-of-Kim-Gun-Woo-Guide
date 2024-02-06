import { v4 as uuid } from 'uuid';
import { supabase } from '../../../api/supabase/supabaseClient';

export const handleFilesUpload = async (
  file: File,
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
  setFormValues((prevValues) => ({
    ...prevValues,
    files: [...prevValues.files],
    uploadedFileUrl: [...prevValues.uploadedFileUrl]
  }));
  try {
    const newFileName = uuid();
    const { data, error } = await supabase.storage
      .from('files')
      .upload(`files/${newFileName}`, file);
    if (error) {
      console.log('파일 업로드 중 오류가 발생했습니다', error);
      return;
    }
    const res = supabase.storage.from('files').getPublicUrl(data.path);
    setFormValues((prevValues: any) => ({
      ...prevValues,
      files: [...prevValues.files, file],
      uploadedFileUrl: [...prevValues.uploadedFileUrl, res.data.publicUrl]
    }));
    console.log(res.data.publicUrl);
  } catch (error) {
    console.error('파일을 업로드하지 못했습니다:', error);
  }
};
