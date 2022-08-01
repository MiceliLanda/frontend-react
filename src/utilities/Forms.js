class Form {

    /**
     * Validar Login
     * @param str 
     * @returns boolean
     */
    static validEmail(str) {  
        let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return regex.test(str);
    }

    /**
     * Tamaño minimo del string
     * @param str 
     * @param length 
     * @returns 
     */
    static minLength(str, length) {
        let isInvalid = false;

        if (str.length < length) {
            isInvalid = true;
        }

        return isInvalid;
    }

    static confirmPassword(pwd, confirmPassword){
        let correctPwd = false;
        if(pwd != confirmPassword){
            correctPwd = true;
        }
        return correctPwd;
    }
    /**
     * Form Validator
     * @param  obj 
     * @returns 
     */
    static validator(obj) {
        let keys = Object.entries(obj);
        let results = [];
        let validations = null;

        let pwd;

        keys.map((key) => {
            if (key[0]=='password') {
                pwd = '';
                pwd = key[1].value;
            }
            if ('isRequired' in key[1] && key[1].isRequired) { //validar que los campos no esten vacios
                if (key[1].value.length === 0) { //Si el input esta vacio
                    results.push({
                        [key[0]]: [`The ${key[0]} is required.`]
                    });
                } else {
                    if ('isEmail' in key[1] && key[1].isEmail) { //validar que el correo sea un correo valida usando expresiones regulares - validEmail()
                        let isValidEmail = Form.validEmail(key[1].value);

                        if (!isValidEmail) {
                            results.push({
                                [key[0]]: [`The ${key[0]} must be valid email.`]
                            });
                        }
                    }

                    if ('minLength' in key[1] && Form.minLength(key[1].value, key[1].minLength)) { //validar el tamaño de la contraseña
                        results.push({
                            [key[0]]: [`The ${key[0]} must at least ${key[1].minLength} characters.`]
                        });
                    }
                }
            } //else if ('isEmail' in key[1]) { //validar que el correo sea un correo valida usando expresiones regulares - validEmail()
            //     let isValidEmail = Form.validEmail(key[1].value);
            //     if (!isValidEmail) {
            //         results.push({
            //             [key[0]]: [`The ${key[0]} must be valid email`]
            //         });
            //     }
            // } else if ('minLength' in key[1] && Form.minLength(key[1].value, key[1].minLength)) { //validar el tamaño de la contraseña
            //     results.push({
            //         [key[0]]: [`The ${key[0]} must at least ${key[1].minLength} characters.`]
            //     });
            // } 
            
            if (Form.confirmPassword(pwd, key[1].value)) { //validar que las contraseñas coincidan
                if (key[0] == 'confirmPassword') {
                    results.push({
                        [key[0]]: [`Passwords do not match.`]
                    });
                }                
            }            

            return results
        })

        results = Object.assign({}, ...results.map((result) => result))

        if (Object.keys(results).length > 0) {
            validations = {
                errors: results
            }
        } else {
            validations = null
        }

        return validations;
    }
}

export default Form