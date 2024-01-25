import { supabase } from '../../api/supabase/supabaseClient';
import { Communityy, UsedItem } from '../home/usedtypes';

export interface ResearchResults {
  usedItemsWithImages: UsedItem[];
  communityItemsWithImages: Communityy[];
}
export async function researchItems(searchQuery: string) {
  const { data: usedItemData, error: usedItemError } = await supabase
    .from('products')
    .select('*')
    .or(
      `title.ilike.%${searchQuery}%, contents.ilike.%${searchQuery}%, tags.cs.{${searchQuery}}`
    );

  const { data: communityData, error: communityError } = await supabase
    .from('community')
    .select('*')
    .or(`title.ilike.%${searchQuery}%, content.ilike.%${searchQuery}%`);

  if (usedItemError || communityError) {
    console.error(
      '데이터 베이스에 요청을 실패하였습니다:',
      usedItemError || communityError
    );
    return;
  }

  // 중고 게시물 이미지 가져오기
  const usedItemsWithImages = await Promise.all(
    usedItemData.map(async (item) => {
      const pathToImage = `products/${item.image_url}.png`;
      const { data } = await supabase.storage
        .from('images')
        .getPublicUrl(pathToImage);
      return { ...item, data };
    })
  );

  // 커뮤 게시물 이미지 가져오기
  const communityItemsWithImages = await Promise.all(
    communityData.map(async (item) => {
      const pathToImage = `quill_imgs/${item.image_Url}.png`;
      const { data } = await supabase.storage
        .from('images')
        .getPublicUrl(pathToImage);
      return { ...item, data };
    })
  );

  return { usedItemsWithImages, communityItemsWithImages };
}
