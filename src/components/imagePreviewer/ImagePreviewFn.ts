import { supabase } from '../../api/supabase/supabaseClient';
import { v4 as uuid } from 'uuid';

/**
 * @param files - file Input의 파일 리스트
 * @return - storage에 올리고 publicUrl을 배열에 담아 반환
 * */
const handleFileUpload = async (files: FileList) => {
  const urlArray = Array.from(files).map(async (file) => {
    const { data, error: imageUploadFailed } = await supabase.storage
      .from('images')
      .upload(`images/${uuid()}`, file);

    // 업로드 에러처리
    if (imageUploadFailed)
      console.log('images upload Fialed', imageUploadFailed);

    // 데이터가 오면 publicURL 반환하여 배열에 담기
    if (data) {
      return supabase.storage.from('images').getPublicUrl(data.path, {
        transform: {
          width: 300,
          height: 300,
          quality: 50,
          resize: 'contain'
        }
      }).data.publicUrl;
    }
  });
  return urlArray.filter((url) => url !== undefined);
};

export { handleFileUpload };
