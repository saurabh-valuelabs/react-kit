import logoSrc from '../../images/logo.svg';
import logoSquareSrc from '../../images/logo-square.svg';

export const meta = {
  title: 'ValueLabs React',
  metaTitle: '',
  ogTitle: 'ValueLabs React',
  metaDescription: 'ValueLabs React',
  ogDescription: 'ValueLabs React',
  metaKeywords: 'ValueLabs React',
  ogImage: logoSrc,
  geoRegion: 'India',
  geoPlacename: 'Hyderabad',
  geoPosition: '51.570454;-3.236428',
  ICBM: '51.570454;-3.236428',
  ogSiteName: 'ValueLabs React',
  ogUrl: 'https://www.yoursite.com',
  ogType: 'learning',
  logoSquareSrc,
  lang: 'en',
  dir: 'ltr',
};
export const headerBlock = {
  logoSrc,
  logoSquareSrc,
  logoAltText: 'ValueLabs React',
};
export const formFields = [
  {
    id: 'username',
    fieldName: 'user_name',
    label: '',
    inputIcon: 'fa fa-user',
    placeHolder: 'User Name',
    fieldType: 'text',
    autoComplete: 'username',
    validationRules: {
      isRequired: true,
    },
    validationMessageOptions: {
      isRequired: 'Please enter your User Name',
    },
    validationMessage: 'Please enter your User Name',
  },
  {
    id: 'password',
    fieldName: 'password',
    label: '',
    inputIcon: 'fa fa-lock',
    placeHolder: 'Password',
    fieldType: 'password',
    autoComplete: 'current-password',
    validationRules: {
      isRequired: true,
    },
    validationMessageOptions: {
      isRequired: 'Please enter your Password',
    },
    validationMessage: 'Please enter your Password',
  },
];
export const formName = 'login';
export const path = 'login';
