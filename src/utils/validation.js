exports.Validate = (val, rules) => {

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
            var fileExt = val.name.split('.').pop().toLowerCase()
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