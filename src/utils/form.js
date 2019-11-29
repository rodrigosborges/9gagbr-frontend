const handleChange = function(event) {
    event.persist()
    let change = {}
    change[event.target.name] = event.target.type === 'file' ? event.target.files[0] : event.target.value
    this.setState(change, () => {
        this.inputValidate(event.target.name)
    })
}

const inputValidate = function(key) {
    var field = this.validate(this.state[key], this.state.validations[key])

    if(field.valid == false){
        this.setState(prevState => {
            let validationErrors = Object.assign({}, prevState.validationErrors);
            validationErrors[key] = field.message;
            return { validationErrors };
        })
    }else{
        this.setState(prevState => {
            let validationErrors = Object.assign({}, prevState.validationErrors);
            validationErrors[key] = "";
            return { validationErrors };
        })
    }

    return field.valid
}

const validate = function(val, rules) {

    var result = {
        valid: true,
        message: ''
    }

    Object.keys(rules).map((type) => {
    
        if(result.message != '' || (type != 'required' && (val === "" || val === null))){}
        else if(type == 'required'){
            if(val === null || val === ""){
                result.valid = false
                result.message = "Esse campo é obrigatório"
            }
        }else if(type == 'ext'){
            var fileExt = val ? val.name.split('.').pop().toLowerCase() : null
            if(!rules[type].includes(fileExt)){
                result.valid = false
                result.message = "Esse campo contém arquivo com extensão inválida"
            }
        }else if(type == 'minLength'){
            if(val.length < rules[type]){
                result.valid = false
                result.message =`Esse campo deve conter no mínimo ${rules[type]} caracteres`
            }
        }else if(type == 'maxLength'){
            if(val.length > rules[type]){
                result.valid = false
                result.message =`Esse campo deve conter no máximo ${rules[type]} caracteres`
            }
        }else if(type == 'email'){
            var re = /\S+@\S+\.\S+/;
            if(!re.test(val)){
                result.valid = false
                result.message =`Esse campo deve conter um e-mail válido`
            }
        }
    })

    return result;
}

module.exports = {
    handleChange,
    inputValidate,
    validate
}