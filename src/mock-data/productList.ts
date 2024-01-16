import { singleProductMock } from './singleProduct';

export const productListMock = [
  {
    id: 'p1',
    title: 'Shoes product title',
    price: 25,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, facere! At, magni eaque? Nobis.',
    images: [
      'https://raw.githubusercontent.com/VladislavMinchuk/react-e-store/develop/src/assets/images/adid_or_spez_01_lg.jpg',
    ],
    shoesSize: [
      { size: '36', id: 1 },
      { size: '37', id: 2 },
      { size: '38', id: 3 },
      { size: '39', id: 4 },
    ],
  },
  {
    id: 'p2',
    title: 'Shoes product title',
    price: 19.9,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, facere! At, magni eaque? Nobis.',
    images: [
      'https://raw.githubusercontent.com/VladislavMinchuk/react-e-store/develop/src/assets/images/adid_or_spez_03_lg.jpg',
    ],
    shoesSize: [
      { size: '36', id: 1 },
      { size: '39', id: 4 },
    ],
  },
  {
    id: 'p3',
    title: 'Shoes product title',
    price: 24.9,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, facere! At, magni eaque? Nobis.',
    images: [
      'https://raw.githubusercontent.com/VladislavMinchuk/react-e-store/develop/src/assets/images/adid_or_spez_05_lg.jpg',
    ],
    shoesSize: [
      { size: '40', id: 5 },
      { size: '41', id: 6 },
      { size: '42', id: 7 },
      { size: '43', id: 8 },
    ],
  },
  singleProductMock,
];
