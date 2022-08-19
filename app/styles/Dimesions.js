import {Dimensions} from 'react-native';
const GuidLineWidth = 375;
const GuidLineheight = 812;

const {width, height} = Dimensions.get('window');
const WP = size => (width / GuidLineWidth) * size;
const HP = size => (height / GuidLineheight) * size;
export {WP, HP, width as WINDOW_WIDTH, height as WINDOW_HEIGHT};
