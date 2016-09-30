import {Swipe, Manager, DIRECTION_HORIZONTAL} from 'hammerjs'
import { previousSlide, nextSlide } from './slides'

export const addSwipeListener = () => {
  const mc = new Manager(document.body)

  mc.add( new Swipe({ direction: DIRECTION_HORIZONTAL, threshold: 0 }) )
  mc.on("swipeleft", nextSlide)
  mc.on("swiperight", previousSlide)

}
