import axios from 'axios';

export default class Request {
  constructor(params) {
    this.params = params;
    this.successNotification = {
      type: 'ADD_NOTIFICATION_MIDDLEWARE',
      callNotification: true,
      text: '',
      id: new Date().getTime(),
      level: 'success'
    };
    this.errorNotification = {
      type: 'ADD_NOTIFICATION_MIDDLEWARE',
      callNotification: true,
      text: '',
      id: new Date().getTime(),
      level: 'error'
    };
  }

  callGet(type, successMessage, errorMessage) {
    return axios.get(this.params.url, this.params.config)
      .then((response) => {
        if (response.data.Errors !== undefined
         && response.data.Errors !== null) {
          if (type) {
            this.params.store.dispatch(this.getErrorObjectToDispatch(type, response.data.Errors));
          }
          throw response.data.Errors;
        } else {
          if (successMessage) {
            this.successNotification.text = successMessage;
            this.params.store.dispatch(this.successNotification);
          }
          return response;
        }
      })
      .catch((errors) => {
        if (errorMessage) {
          this.errorNotification.text = errorMessage;
          this.params.store.dispatch(this.errorNotification);
        }
        if (this.params.catch) {
          this.params.store.dispatch({
            type: this.params.catch.type,
            errors
          });
        }
        this.handleCallError(errors, this.params.url, 'GET');
        return errors;
      });
  }

  callPost(type, successMessage, errorMessage) {
    return axios.post(this.params.url, this.params.data, this.params.config)
      .then((response) => {
        if (response.data.Errors !== undefined
         && response.data.Errors !== null) {
          if (type) {
            this.params.store.dispatch(this.getErrorObjectToDispatch(type, response.data.Errors));
          }
          throw response.data.Errors;
        } else {
          if (successMessage) {
            this.successNotification.text = successMessage;
            this.params.store.dispatch(this.successNotification);
          }
          return response;
        }
      })
      .catch((errors) => {
        if (errorMessage) {
          this.errorNotification.text = errorMessage;
          this.params.store.dispatch(this.errorNotification);
        }
        if (this.params.catch) {
          this.params.store.dispatch({
            type: this.params.catch.type,
            errors
          });
        }
        this.handleCallError(errors, this.params.url, 'POST');
        return errors;
      });
  }

  callPut(type, successMessage, errorMessage) {
    return axios.put(this.params.url, this.params.data, this.params.config)
      .then((response) => {
        if (response.data.Errors !== undefined
         && response.data.Errors !== null) {
          if (type) {
            this.params.store.dispatch(this.getErrorObjectToDispatch(type, response.data.Errors));
          }
          throw response.data.Errors;
        } else {
          if (successMessage) {
            this.successNotification.text = successMessage;
            this.params.store.dispatch(this.successNotification);
          }
          return response;
        }
      })
      .catch((errors) => {
        if (errorMessage) {
          this.errorNotification.text = errorMessage;
          this.params.store.dispatch(this.errorNotification);
        }
        if (this.params.catch) {
          this.params.store.dispatch({
            type: this.params.catch.type,
            errors
          });
        }
        this.handleCallError(errors, this.params.url, 'PUT');
        return errors;
      });
  }

  callDelete(type, successMessage, errorMessage) {
    return axios.delete(this.params.url, this.params.config)
      .then((response) => {
        if (response.data.Errors !== undefined
         && response.data.Errors !== null) {
          if (type) {
            this.params.store.dispatch(this.getErrorObjectToDispatch(type, response.data.Errors));
          }
          throw response.data.Errors;
        } else {
          if (successMessage) {
            this.successNotification.text = successMessage;
            this.params.store.dispatch(this.successNotification);
          }
          return response;
        }
      })
      .catch((errors) => {
        if (errorMessage) {
          this.errorNotification.text = errorMessage;
          this.params.store.dispatch(this.errorNotification);
        }
        if (this.params.catch) {
          this.params.store.dispatch({
            type: this.params.catch.type,
            errors
          });
        }
        this.handleCallError(errors, this.params.url, 'DELETE');
        return errors;
      });
  }

  // Dispatch error action here
  getErrorObjectToDispatch(type, error) {
    switch (type) {
      case 'SIGNIN_USER':
        return {
          type: 'ERRORS_SIGNIN_USER',
          message: error
        };
      case 'SIGNUP_USER':
        return {
          type: 'ERRORS_SIGNUP_USER',
          message: error
        };
      case 'FORGET':
        return {
          type: 'ERRORS_FORGET_PASSWORD',
          message: error
        };
      default:
        return {};
    }
  }

  handleCallError(errs, url, method) {
    // TODO: probably we need some logger, now it's just logging to console
    console.log(`Failed calling ${method} for URL:`, url);
    console.log(`Reason:`, errs);
  }
}