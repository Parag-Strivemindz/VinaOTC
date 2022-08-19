import {postRequest} from '../../utils/AxiosRequest';
import {devEnviromentVariables} from '../../config/env';

function errorhandler(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(JSON.stringify(error.response) + ' server Response');
    if (error.response.data) {
      alert(error.response.data.message);
    }
    if (error.response.status > 200) {
      // alert(error.response.status);
    }
    // alert(error.response.status);
    // alert(error.response.headers);
  } else if (error.request) {
    console.log(error.request + ' Server not responding');
    //the requset is made but no response is send by server
  } else {
    //something happen in setting up request that triggers an Error
    alert('Someting went wrong please try again');
    console.log(error.message + ' Someting went wrong');
  }
  // console.log(error.config);
}

export default Register =
  (fullName, email, password, setRegister) => dispatch => {
    try {
      setRegister(prev => ({
        ...prev,
        isRegister: false,
        isLoading: true,
      }));
      postRequest(devEnviromentVariables.LOCAL_REGISTER, {
        fullName,
        email,
        password,
      })
        .then(res => {
          console.log(JSON.stringify(res) + ' response');
          setRegister(prev => ({
            ...prev,
            isLoading: false,
            isRegister: true,
          }));
        })
        .catch(error => {
          errorhandler(error);
          // console.log(error + ' error From Regiseter');
          setRegister(prev => ({
            ...prev,
            isLoading: false,
            isRegister: false,
          }));
        });
    } catch (error) {
      console.error(error);
    }
  };
