import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../utilities/Forms";

import Swal from "sweetalert2";

const Valid  = () => {
    const [mensaje, setMensaje] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);



    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": email,
        "password": password
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const querystring = window.location.search
    const params = new URLSearchParams(querystring)

    const valid = () => {


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": params.get('email')
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://52.71.40.127/api/user/estado", requestOptions)
            .then(response => response.text())
            .then(result => {
                Swal.fire({
                    title: 'Bienvenido!!',
                    text: 'se a verificado correctamente ya puede iniciar sesion',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
            })
            .catch(error => {
                Swal.fire({
                    title: 'Oh no!',
                    text: 'se prudujo un error, no sabemos que paso',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            });
    }

    return (
        <div className="auth-wrapper">

            <div className="auth-inner">
                <h1>Welcom to valid acount</h1>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-primary w-100 theme-btn mx-auto" onClick={() => valid()}
                        >
                            Log In
                        </button>
                    </div>
            </div>
        </div>
    );
};

export default Valid;
