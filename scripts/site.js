
// General imports
import controller from '@squarespace/controller';

// Import controllers
import ContentRevealer from './controllers/ContentRevealer';
import ResponsiveImageLoader from './controllers/ResponsiveImageLoader';
import SiteLoader from './controllers/SiteLoader';
import BlogList from './controllers/BlogList';
import BlogItem from './controllers/BlogItem';
import BlogStyles from './controllers/BlogStyles';
import HeaderMenu from './controllers/HeaderMenu';
import MapViewer from './controllers/MapViewer';

// Bind controllers
controller.register('BlogStyles', BlogStyles);
controller.register('ContentRevealer', ContentRevealer);
controller.register('ResponsiveImageLoader', ResponsiveImageLoader);
controller.register('SiteLoader', SiteLoader);
controller.register('BlogList', BlogList);
controller.register('BlogItem', BlogItem);
controller.register('HeaderMenu', HeaderMenu);
controller.register('MapViewer', MapViewer);
