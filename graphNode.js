/**
 * Created by PhpStorm.
 * User: TJ 
 * Date: 20/01/19
 * Time: 02:30 PM
 */
 

import { getColor } from 'Constants/categories';
import { SNOW, SOLITUDE } from 'Styles/constants';

/**
 * Generates svg based on the given parameters
 * @param {string} text - content of the node
 * @param {string} category - determines color and text on top right corner of the node
 * @param {boolean} hidden - Determines if node should have fade effect or not
 */
const graphNode = (text, category, hidden = false) => {
  const color = getColor(category);
  const floodColor = hidden ? SNOW : SOLITUDE;
  const opacity = hidden ? 0.2 : 1;
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    width="255" 
    height="160" 
    viewBox="0 0 255 160">
  <style>
    .category { 
      font-size:8px;
      font-family:Helvetica;
      font-weight:700;
    }
  </style>
  <defs>
    <filter id="Rectangle" x="0" y="0" width="255" height="160" filterUnits="userSpaceOnUse">
      <feOffset dy="4" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="8.5" result="blur"/>
      <feFlood flood-color="${floodColor}" />
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Aussage" transform="translate(25.5 16.5)">
    <g transform="matrix(1, 0, 0, 1, -25.5, -16.5)" filter="url(#Rectangle)">
      <rect id="Rectangle-2" data-name="Rectangle" width="204" height="109" rx="10" transform="translate(25.5 21.5)" fill="#fff"/>
    </g>
    <foreignObject x="15" y="15" width="180" height="150">
      <style>
        p { color: #6d6d6d; font-size: 14px; font-family=SegoeUI, Segoe UI; opacity: ${opacity};} 
      </style>
      <p xmlns="http://www.w3.org/1999/xhtml">${text}</p>
    </foreignObject>
    <circle opacity="${opacity}" id="Oval_2" data-name="Oval 2" cx="3" cy="3" r="3" transform="translate(186 12)" fill="${color}"/>
    <text opacity="${opacity}" fill="${color}" class="category" text-anchor="end" x="182" y="18">${category.toUpperCase()}</text>
  </g>
</svg>
`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export default graphNode;
