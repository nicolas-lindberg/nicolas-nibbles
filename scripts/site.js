
// General imports
import controller from '@squarespace/controller';

// Import controllers
import SiteLoader from './controllers/SiteLoader';
import BlogList from './controllers/BlogList';
import BlogItem from './controllers/BlogItem';
import BlogStyles from './controllers/BlogStyles';
import HeaderMenu from './controllers/HeaderMenu';
import ResponsiveImageLoader from './controllers/ResponsiveImageLoader';
import ContentRevealer from './controllers/ContentRevealer';
import MapViewer from './controllers/MapViewer';

// Bind controllers
controller.register('SiteLoader', SiteLoader);
controller.register('BlogList', BlogList);
controller.register('BlogLayout', BlogLayout);
controller.register('BlogStyles', BlogStyles);
controller.register('HeaderMenu', HeaderMenu);
controller.register('ResponsiveImageLoader', ResponsiveImageLoader);
controller.register('ContentRevealer', ContentRevealer);
controller.register('MapViewer', MapViewer);
