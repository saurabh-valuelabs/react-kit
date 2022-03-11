export const initialState = {
  /**
   * Generic
   */
  isLoading: false,
  fieldFetched: false,
  /**
   * Form Related
   */
  formsValue: {
    login: {
      user_name: '',
      password: '',
    },
    user: {
      iUserId: '',
      vUserName: '',
      tPassword: '',
      tPasswordRepeat: '',
      vName: '',
      vContact: '',
      vPhoto: '',
      tBio: '',
      eUserType: 'FRANCHISOR',
      eStatus: 'NEW',
    },
    myProfile: {
      iUserId: '',
      vUserName: '',
      tPassword: '',
      tPasswordRepeat: '',
      vName: '',
      vContact: '',
      vPhoto: '',
      tBio: '',
      eUserType: 'FRANCHISOR',
      eStatus: 'NEW',
    },
  },
  formsValid: {
    login: {
      user_name: false,
      password: false,
    },
    user: {
      iUserId: false,
      vUserName: false,
      tPassword: false,
      tPasswordRepeat: false,
      vName: false,
      vContact: false,
      vPhoto: false,
      tBio: false,
      eUserType: false,
      eStatus: false,
    },
    myProfile: {
      iUserId: false,
      vUserName: false,
      tPassword: false,
      tPasswordRepeat: false,
      vName: false,
      vContact: false,
      vPhoto: false,
      tBio: false,
      eUserType: false,
      eStatus: false,
    },
  },
  formsReadonly: {
    login: {
      user_name: false,
      password: false,
    },
    user: {
      iUserId: false,
      vUserName: false,
      tPassword: false,
      tPasswordRepeat: false,
      vName: false,
      vContact: false,
      vPhoto: false,
      tBio: false,
      eUserType: false,
      eStatus: false,
    },
    myProfile: {
      iUserId: false,
      vUserName: true,
      tPassword: false,
      tPasswordRepeat: false,
      vName: false,
      vContact: false,
      vPhoto: false,
      tBio: false,
      eUserType: false,
      eStatus: false,
    },
  },
  /**
   * Type Ahead Params
   */
  typeAheadOptions: {
    users: [],
  },
  /**
   * Login Related
   */
  isLogin: false,
  userProfile: {
    iUserId: '',
    vUserName: '',
    tPassword: '',
    tPasswordRepeat: '',
    vName: '',
    vContact: '',
    vPhoto: '',
    tBio: '',
    eUserType: 'FRANCHISOR',
    eStatus: 'NEW',
  },
};
