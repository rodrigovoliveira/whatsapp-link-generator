declare module 'react-slick' {
  import React from 'react';

  export interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    arrows?: boolean;
    adaptiveHeight?: boolean;
    customPaging?: (i: number) => React.ReactNode;
    [key: string]: any;
  }

  export default class Slider extends React.Component<Settings> {}
} 