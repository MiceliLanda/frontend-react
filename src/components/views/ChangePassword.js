import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../utilities/Forms";
import Swal from "sweetalert2";
const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const querystring = window.location.search
    const params = new URLSearchParams(querystring)

    const agregar = async () => {
        if (password === confirmPassword && confirmPassword === password) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "email": params.get('email'),
                "password": password
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://52.71.40.127/api/user/update", requestOptions)
                .then(response => response.text())
                .then(result => console.log())
                .catch(error => console.log('error', error));
            Swal.fire({
                title: 'Contraseña Restablecida!',
                text: 'Se a restablecido su contraseña con exito!!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        } else {
            Swal.fire({
                title: 'Oh no!',
                text: 'Contraseñas invalidas,Sus contraseñas no coinciden',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

    }


    const validateRegister = () => {
        let isValid = true;

        let validator = Form.validator({

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
            setPassword("");
            setConfirmPassword("");
            alert("updated password");
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
                    <h3>Cambiar Contraseña</h3>

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

export default ChangePassword;
