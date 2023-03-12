export type TextSliderProps = {
  title: string,
  subtitle: string,
}

export type ImageSliderProps = {
  image: string,
  text: string,
}

export enum SliderType {
  TEXT = 'text',
  IMAGE = 'image'
}