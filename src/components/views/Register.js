import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../utilities/Forms";



const Register = () => {



  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);


  const peticion = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
    body: JSON.stringify(

        {
          "name": name,
          "email": email,
          "password": password,
        }

    )
  }

  const sendValiud = (value) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": email
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://52.71.40.127/api/user/valid", requestOptions)
        .then(response => response.text())
        .then(result => console.log("Enviado"))
        .catch(error => console.log('error', error));

  }

  const agregar = value => {
    const data = fetch("http://52.71.40.127/api/user/create", peticion)
        .then((res) => res.json)
        .then((data) => console.log("si entre ala base" + data))
        .catch((err) => console.error(err));
    sendValiud(value)
  };


  const validateRegister = () => {
    let isValid = true;

    let validator = Form.validator({
      name: {
        value: name,
        isRequired: true,
      },
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
      confirmPassword: {
        value: confirmPassword,
        isRequired: true,
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

  const register = (e) => {
    e.preventDefault();

    const validate = validateRegister();

    if (validate) {
      setValidate({});
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      alert("Successfully Register User");
      window.location.href = "./sign-in";

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
          onSubmit={register}
          autoComplete={"off"}
        >
          <h3>Sign Up</h3>
          <div className="name mb-3 text-center">
            <label>Usuario</label>
            <input
              type="text"
              className={`form-control ${
                validate.validate && validate.validate.name ? "is-invalid " : ""
              }`}
              id="name"
              name="name"
              value={name}
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />
            <div
              className={`invalid-feedback text-start ${
                validate.validate && validate.validate.name
                  ? "d-block"
                  : "d-none"
              }`}
            >
              {validate.validate && validate.validate.name
                ? validate.validate.name[0]
                : ""}
            </div>
          </div>

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
                pattern="(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ].*"
                title="Debe tener al menos una mayúscula, una minúscula y un dígito"
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
          </div>
          <div className="confirm-password mb-3">
            <div className="input-group">
              <input
                type="password"
                className={`form-control ${
                  validate.validate && validate.validate.password
                    ? "is-invalid "
                    : ""
                }`}
                name="confirm-pwd"
                id="confirm-pwd"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {/* <button type="button" className="btn btn-outline-primary btn-sm" onClick={(e) => togglePassword(e)} ><i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button> */}

              <div
                className={`invalid-feedback text-start ${
                  validate.validate && validate.validate.confirmPassword
                    ? "d-block"
                    : "d-none"
                }`}
              >
                {validate.validate && validate.validate.confirmPassword
                  ? validate.validate.confirmPassword[0]
                  : ""}
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary w-100 theme-btn mx-auto " onClick={() => agregar()}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
