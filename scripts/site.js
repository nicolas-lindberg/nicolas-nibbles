
// General imports
import controller from '@squarespace/controller';

import BlogLayout from './controllers/BlogLayout';
import HeaderNav from './controllers/HeaderNav';
import ImageLoader from './controllers/ImageLoader';

// Bind controllers
controller.register('BlogLayout', BlogLayout);
controller.register('HeaderNav', HeaderNav);
controller.register('ImageLoader', ImageLoader);
