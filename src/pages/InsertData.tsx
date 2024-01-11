import { supabase } from './Supabase';

async function seedData() {
  const fakeData = [
    {
      uid: 'fake-uid-1',
      created_at: '2024-01-10T12:00:00Z',
      post_user: 'John Doe',
      nickname: 'johnny',
      title: 'Fake Item 1',
      contents: 'This is a fake item 1',
      price: 100,
      count: 1,
      tags: ['fake', 'item'],
      location: 'Fake City',
      deal_type: 'sell',
      like_user: ['fake-like-user-1'],
      likes: 10,
      quality: 'good',
      exchangable: true,
      shipping_cost: false,
      agreement: true
    }
  ];

  const { data, error } = await supabase
    .from('used_item__board')
    .insert(fakeData);

  if (error) {
    console.error('Error seeding data:', error);
  } else {
    console.log('Data seeded successfully:', data);
  }
}

seedData();
