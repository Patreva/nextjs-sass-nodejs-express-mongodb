import Link from 'next/link';

import './Categories.scss';

const Categories = () => {
  return (
    <section className='home-categories'>
      <div className='home-categories__wrapper'>
        <Link href='/categories/healthy-food-and-disease-prevention'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/healthy-food-and-disease-prevention.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>Disease Prevention</h2>
              <p className='home-categories-card__text'>
              Often heard of the phrase "you are what you eat." Incorporating a healthy diet into your lifestyle will no doubt protect you from life threatening diseases.
              </p>
            </div>
          </a>
        </Link>

        <Link href='/categories/nutrients'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/nutrients.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>Nutrients</h2>
              <p className='home-categories-card__text'>
              Nutrients are essential substances that are found in food drive biological activity. They are categorized as proteins,fats,carbohydrates,vitamins and minerals.
              </p>
            </div>
          </a>
        </Link>

        <Link href='/categories/sports-nutrition'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/sports-nutrition.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>Sports Nutrition</h2>
              <p className='home-categories-card__text'>
              To enhance sports performance,it is very important to balance exercise,nutrition and rest.
              </p>
            </div>
          </a>
        </Link>

        <Link href='/categories/nutrition-by-age'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/nutrition-by-age.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>Nutrition by age</h2>
              <p className='home-categories-card__text'>
              Nutritional needs tend to change from one life stage to another.Eating healthy therefore becomes important as one ages,because aging is often associated with nutrient deficiencies.
              </p>
            </div>
          </a>
        </Link>

        <Link href='/categories/eating-and-mental-health'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/eating-and-mental-health.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>Mental Health</h2>
              <p className='home-categories-card__text'>
              Scientific research backed up by evidence indicate that nutrition plays an important role in prevention and management of diagnosed mental health problems.
              </p>
            </div>
          </a>
        </Link>

        <Link href='/categories/the-world-cuisines'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/the-world-cuisines.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>The World cuisines</h2>
              <p className='home-categories-card__text'>
              When it comes to food,there is no boundaries,especially due to importation you can comfortably enjoy different types of cuisines.
              </p>
            </div>
          </a>
        </Link>
      </div>.cv
    </section>
  );
};

export default Categories;
