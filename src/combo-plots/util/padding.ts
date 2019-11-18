import { BBox } from '@antv/g';
import * as _ from '@antv/util';

export function getOverlappingPadding(layer, components) {
  let viewMinX = layer.layerBBox.minX;
  let viewMaxX = layer.layerBBox.maxX;
  let viewMinY = _.clone(layer.layerBBox.minY);
  let viewMaxY = layer.layerBBox.maxY;
  _.each(components, (component) => {
    const { position } = component;
    const { minX, maxX, minY, maxY } = component.getBBox();
    if (maxY > viewMinY && maxY < viewMaxY && position === 'top') {
      viewMinY = maxY;
    }
    if (minY > viewMinY && minY < viewMaxY && position === 'bottom') {
      viewMaxY = minY;
    }
    if (maxX > viewMinX && maxX < viewMaxX && position === 'left') {
      viewMinX = maxX;
    }
    if (minX > viewMinX && maxX < viewMaxX && position === 'right') {
      viewMaxX = minX;
    }
  });
  const range = new BBox(viewMinX, viewMinY, viewMaxX - viewMinX, viewMaxY - viewMinY);
  const top_padding = range.minY - layer.layerBBox.minY;
  const right_padding = layer.layerBBox.maxX - range.maxX;
  const bottom_padding = layer.layerBBox.maxY - range.maxY;
  const left_padding = range.minX - layer.layerBBox.minX;

  return [top_padding, right_padding, bottom_padding, left_padding];
}
