import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../utilities/Forms";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const login = value => {


  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "email": email,
    "password": password
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  
    redirect: 'follow'
  };

  fetch("http://52.71.40.127/api/user/login", requestOptions)
      .then(response => response.json())
      .then(result => {
        switch (result.error) {
          case "Usuario no encontrado":
            Swal.fire({
              title: 'Oh no!',
              text: 'Usuario invalido!',
              icon: 'error',
              confirmButtonText: 'Cool'
            })
            break;
          case "Usuario no verificado":
            Swal.fire({
              title: 'Oh no!',
              text: 'El usuario no tiene permisos, no esta verificado',
              icon: 'error',
              confirmButtonText: 'Cool'
            })
            break;
          case "contraseña no válida":
            Swal.fire({
              title: 'Oh no!',
              text: 'contraseña invalida',
              icon: 'error',
              confirmButtonText: 'Cool'
            })
            break;

          default:
            navigate('/dashboard');
            break;
        }
      })
      .catch(error => console.error);


}



  const validateLogin = () => {
    let isValid = true;

    let validator = Form.validator({
      email: {
        value: email,
        isRequired: true,
        isEmail: true,
      },
      password: {
        value: password,
        isRequired: true,
        minLength: 8,
      },
    });

    if (validator !== null) {
      setValidate({
        validate: validator.errors,
      });

      isValid = false;
    }
    return isValid;
  };

  const authenticate = (e) => {
    e.preventDefault();

    const validate = validateLogin();


    if (validate) {
      setValidate({});
      setEmail("");
      setPassword("");

    }
  };


  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  return (
    <div className="auth-wrapper">

      <div className="auth-inner">
        <form
          className="auth-form"
          method="POST"
          onSubmit={authenticate}
          autoComplete={"off"}
        >

          <h3>Sign In</h3>

          <div className="email mb-3">
            <input
              type="email"
              className={`form-control ${
                validate.validate && validate.validate.email
                  ? "is-invalid "
                  : ""
              }`}
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div
              className={`invalid-feedback text-start ${
                validate.validate && validate.validate.email
                  ? "d-block"
                  : "d-none"
              }`}
            >
              {validate.validate && validate.validate.email
                ? validate.validate.email[0]
                : ""}
            </div>
          </div>

          <div className="password mb-3">
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  validate.validate && validate.validate.password
                    ? "is-invalid "
                    : ""
                }`}
                name="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"


                className="btn btn-outline-primary btn-sm"
                onClick={(e) => togglePassword(e)}
              >
                <i
                  className={showPassword ? "far fa-eye" : "far fa-eye-slash"}
                ></i>{" "}
              </button>

              <div
                className={`invalid-feedback text-start ${
                  validate.validate && validate.validate.password
                    ? "d-block"
                    : "d-none"
                }`}
              >
                {validate.validate && validate.validate.password
                  ? validate.validate.password[0]
                  : ""}
              </div>
            </div>

            <div className="extra mt-3 row justify-content-between">
              <div className="col-6">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.currentTarget.checked)}
                  />
                  <label className="form-check-label" htmlFor="remember">
                    Remember me
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="forgot-password text-end">
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="extra mt-3 row">
                <label htmlFor="">You do not have an account? <Link to="/sign-up">Sign Up</Link></label>
            </div>
            <br />

          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary w-100 theme-btn mx-auto" onClick={() => login()}
            >
              Log In
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
