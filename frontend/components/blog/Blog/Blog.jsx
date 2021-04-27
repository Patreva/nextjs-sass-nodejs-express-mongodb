import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import {
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TumblrShareButton,
  TumblrIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  ViberIcon,
  WeiboShareButton,
  WeiboIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'next-share';
import { API, DOMAIN } from '../../../config';

import './Blog.scss';

const Blog = ({ blog, categories }) => {
  return (
    <article className='blog'>
      <figure>
        <img
          src={`${API}/blog/photo/${blog.slug}`}
          alt={blog.title}
          className='blog__banner-img'
        />
      </figure>

      <div className='blog__wrapper'>
        <div className='blog__content'>
          <section>
            <h1 className='blog__title'>{blog.title}</h1>
            <p className='blog__written-by'>
              Written by{' '}
              <Link href={`/profile/${blog.postedBy.username}`}>
                <a>
                  <span>{blog.postedBy.name}</span>
                </a>
              </Link>{' '}
              | Published {moment(blog.updatedAt).fromNow()}
            </p>
          </section>
          <section className='blog__categories-tags'>
            {blog.categories.map((category) => (
              <Link key={category._id} href={`/categories/${category.slug}`}>
                <a className='blog__category'>{category.name}</a>
              </Link>
            ))}

            {blog.tags.map((tag) => (
              <Link key={tag._id} href={`/tags/${tag.slug}`}>
                <a className='blog__tag'>{tag.name}</a>
              </Link>
            ))}
            <br />
          </section>
          <section>
            <div className='blog__text'>{renderHTML(blog.body)}</div>
          </section>

         <PinterestShareButton
         url={`${DOMAIN}/blog/${blog.slug}`}
         media={blog.title}
           >
         <PinterestIcon size={32} round />
         </PinterestShareButton>

         <RedditShareButton
         url={`${DOMAIN}/blog/${blog.slug}`}
         title={blog.title}
         windowWidth={660}
         windowHeight={460}
         >
        <RedditIcon size={32} round />
       </RedditShareButton>

        <TelegramShareButton
          url={`${DOMAIN}/blog/${blog.slug}`}
          title={blog.title}
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      
        <TumblrShareButton
        url={`${DOMAIN}/blogs/${blog.slug}`}
        title={blog.title}
        >
        <TumblrIcon size={32} round />
        </TumblrShareButton>

        <TwitterShareButton
         url={`${DOMAIN}/blogs/${blog.slug}`}
        title={blog.title}
         >
        <TwitterIcon size={32} round />
        </TwitterShareButton>


        <ViberShareButton
         url={`${DOMAIN}/blogs/${blog.slug}`}
         title={blog.title}
         >
        <ViberIcon size={32} round />
       </ViberShareButton>

       <WhatsappShareButton
       url={`${DOMAIN}/blogs/${blog.slug}`}
       title={blog.title}
      separator=":: "
       >
      <WhatsappIcon size={32} round />
    </WhatsappShareButton>
        </div>
        <div className='blog__sidebar'>
          <div className='blog__sidebar-categories'>
            {categories.map((category) => (
              <Link key={category._id} href={`/categories/${category.slug}`}>
                <a className='blog__sidebar-category'>{category.name}</a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Blog;
