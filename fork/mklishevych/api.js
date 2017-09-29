import axios from 'axios';
import {successAction, errorAction, errorByTypeAction} from "./actions";

export default class Request {
    constructor(params) {
        this.params = params;
    }

    _factory(requestMethod, dispatchErrorType, successMessage, errorMessage) {
        return axios[requestMethod.toLowerCase()](this.params.url, this.params.config)
            .then(this.createSuccessHandler(dispatchErrorType, successMessage))
            .catch(this.createErrorHandler(requestMethod.toUpperCase(), errorMessage));
    }

    callGet(dispatchErrorType, successMessage, errorMessage) {
        return this._factory('GET', dispatchErrorType, successMessage, errorMessage);
    }

    callPost(dispatchErrorType, successMessage, errorMessage) {
        return this._factory('POST', dispatchErrorType, successMessage, errorMessage);
    }

    callPut(dispatchErrorType, successMessage, errorMessage) {
        return this._factory('PUT', dispatchErrorType, successMessage, errorMessage);
    }

    callDelete(dispatchErrorType, successMessage, errorMessage) {
        return this._factory('DELETE', dispatchErrorType, successMessage, errorMessage);
    }

    createSuccessHandler(dispatchErrorType, successMessage) {
        return (response) => {
            const error = response.data.Errors;
            if (error !== undefined && error !== null) {
                this.dispatch(errorByTypeAction(dispatchErrorType, error));

                throw error;
            } else {
                if (successMessage) {
                    this.dispatch(successAction(successMessage));
                }
                return response;
            }
        };
    }

    dispatch(message) {
        this.params.store.dispatch(message);
    }

    createErrorHandler(requestMethod, errorMessage) {
        return (errors) => {
            if (errorMessage) {
                this.dispatch(errorAction(errorMessage));
            }
            if (this.params.catch) {
                this.dispatch({
                    type: this.params.catch.type,
                    errors
                });
            }

            this.handleCallError(errors, this.params.url, requestMethod);

            return errors;
        };
    }

    // this code is already perfect, doesn't need any refactoring
    handleCallError(errs, url, method) {
        // TODO: probably we need some logger, now it's just logging to console
        console.log(`Failed calling ${method} for URL:`, url);
        console.log(`Reason:`, errs);
    }
}
