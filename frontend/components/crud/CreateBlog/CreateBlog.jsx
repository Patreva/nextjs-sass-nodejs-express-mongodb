import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../../actions/auth';
import { getCategories } from '../../../actions/category';
import { getTags } from '../../../actions/tag';
import { createBlog } from '../../../actions/blog';
import 'react-quill/dist/quill.snow.css';
import FormInput from '../../FormInput/FormInput';
import { toast } from 'react-toastify';

import './CreateBlog.scss';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreateBlog = ({ router }) => {
  const getBlogDataFromLocalStorage = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const [body, setBody] = useState(getBlogDataFromLocalStorage());
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishBtn: false,
  });

  const token = getCookie('token');
  const { error, sizeError, success, formData, title, hidePublishBtn } = values;

  // when the component mounts, formData is ready to use
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  // initialize categories state
  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  // initialize tags state
  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  // add or remove checked categories from state
  const handleCategoryToggleCheckbox = (categoryId) => () => {
    setValues({ ...values, error: '' });

    const allCheckedCategories = [...checkedCategories];

    // get the index of current checked category
    const checkedCategory = checkedCategories.indexOf(categoryId);

    // if the current checked category is not in the state, add it
    // else remove the category from the state
    if (checkedCategory === -1) {
      allCheckedCategories.push(categoryId);
    } else {
      allCheckedCategories.splice(checkedCategory, 1);
    }

    setCheckedCategories(allCheckedCategories);
    formData.set('categories', allCheckedCategories);

    console.log(allCheckedCategories);
  };

  // add or remove checked tags from state
  const handleTagToggleCheckbox = (tagId) => () => {
    setValues({ ...values, error: '' });

    const allCheckedTags = [...checkedTags];

    // get the index of current checked tag
    const checkedTag = checkedTags.indexOf(tagId);

    // if the current checked tag is not in the state, add it
    // else remove the tag from the state
    if (checkedTag === -1) {
      allCheckedTags.push(tagId);
    } else {
      allCheckedTags.splice(checkedTag, 1);
    }

    setCheckedTags(allCheckedTags);
    formData.set('tags', allCheckedTags);

    console.log(allCheckedTags);
  };

  const publishBlog = (e) => {
    e.preventDefault();
    createBlog(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          error: '',
          success: `A new blog titled "${data.title}" was created`,
        });
        setBody('');
        setCheckedCategories([]);
        setCheckedTags([]);
      }
    });
  };

  // populate form data and update the state
  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    // form data to be processed by the backend to create a new blog
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: '' });
  };

  const handleBody = (e) => {
    // console.log(e);
    // push the event into body
    setBody(e);

    // populate form data
    formData.set('body', e);

    // save to local storage to prevent data loss on page refresh
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
    }
  };

  const notifyError = () => {
    toast(<h3 className='toast-error'>{error}</h3>, {
      type: toast.TYPE.ERROR,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      closeButton: false,
      hideProgressBar: true,
    });
    setValues({ ...values, error: false });
  };

  const notifySuccess = () => {
    toast(<h3 className='toast-success'>{success}</h3>, {
      type: toast.TYPE.SUCCESS,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
      closeButton: false,
      hideProgressBar: true,
    });
    setValues({ ...values, success: '' });
  };

  return (
    <section className='create-blog'>
      <h4 className='create-blog__title'>Create new blog</h4>

      <div className='create-blog__wrapper'>
        <form onSubmit={publishBlog}>
          <FormInput
            type='text'
            value={title}
            label='Blog Title'
            onChange={handleChange('title')}
            required
          />
          <div className='form-group'>
            <ReactQuill
              modules={CreateBlog.modules}
              formats={CreateBlog.formats}
              bounds={'.quill'}
              value={body}
              placeholder='Write something amazing...'
              onChange={handleBody}
            />
          </div>

          <button type='submit' className='create-blog__publish-btn'>
            PUBLISH
          </button>
        </form>
        <div>
          <div className='form-group create-blog__featured-image'>
            <h5 className='create-blog__featured-image-title'>
              Featured Image
            </h5>

            <label className='create-blog__upload-img-btn'>
              Upload Image
              <input
                onChange={handleChange('photo')}
                type='file'
                accept='image/*'
                hidden
              />
            </label>
            <small className='create-blog__img-size-info'>Max Size: 1MB</small>
          </div>
          <div>
            <div className='create-blog__categories'>
              <h5 className='create-blog__categories-title'>Categories</h5>
              <ul style={{ maxHeight: '120px', overflowY: 'scroll' }}>
                {categories &&
                  categories.map((category) => (
                    <li key={category._id}>
                      <input
                        onChange={handleCategoryToggleCheckbox(category._id)}
                        type='checkbox'
                      />
                      <label className='form-check-label'>
                        {category.name}
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
            <div className='create-blog__tags'>
              <h5 className='create-blog__tags-title'>Tags</h5>
              <ul style={{ maxHeight: '120px', overflowY: 'scroll' }}>
                {tags &&
                  tags.map((tag) => (
                    <li key={tag._id}>
                      <input
                        onChange={handleTagToggleCheckbox(tag._id)}
                        type='checkbox'
                      />
                      <label className='form-check-label'>{tag.name}</label>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='notify-message'>
        {success ? notifySuccess() : null}
        {error ? notifyError() : null}
      </div>
    </section>
  );
};

CreateBlog.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block'],
  ],
};

CreateBlog.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block',
];

export default withRouter(CreateBlog);
