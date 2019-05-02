
// General imports
import controller from '@squarespace/controller';

// Import controllers
import BlogLayout from './controllers/BlogLayout';
import HeaderMenu from './controllers/HeaderMenu';
import ResponsiveImageLoader from './controllers/ResponsiveImageLoader';

// Bind controllers
controller.register('BlogLayout', BlogLayout);
controller.register('HeaderMenu', HeaderMenu);
controller.register('ResponsiveImageLoader', ResponsiveImageLoader);
