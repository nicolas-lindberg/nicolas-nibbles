
// General imports
import controller from '@squarespace/controller';


import BlogLayout from './controllers/BlogLayout';
import HeaderNav from './controllers/HeaderNav';
import ResponsiveImageLoader from './controllers/ResponsiveImageLoader';

// Bind controllers
controller.register('BlogLayout', BlogLayout);
controller.register('HeaderNav', HeaderNav);
controller.register('ResponsiveImageLoader', ResponsiveImageLoader);
