import { Field, FormStyled } from "./FormStyle";
import {useForm} from "react-hook-form"

export const Form = () => {

    // Recordar que acá voy a colocar la lógica del componente (en este caso, el componente es el formulario)
    const {register, handleSubmit, formState: {errors}, watch, reset} = useForm()
    // Esto es una buena práctica para no tener toda la lógica mezclada con el formulario
    const submit = handleSubmit((data) => {
            alert("Formulario enviado")
            // Estoy manipulando los datos antes de enviarlos
            data.nombre = data.nombre.trim()
            data.email = data.email.trim()
            // Reseteo los valores del formulario luego de que se enviara
            reset()
        })
    
    const esMayorEdad = (fechaNacimiento, actual) =>{
        const edad = actual.getFullYear() - fechaNacimiento.getFullYear()
        if (edad >= 18){
            return true
        } return false
     } 

    // Register es importante, ya que es quien conecta los inputs con el formulario useForm (este va ÚNICAMENTE en los inputs) e INCLUYE todos los datos donde hay un register en el SUBMIT
    // handleSubmit sirve para poder manejar el envío del formulario, es decir, cuando el usuario le hace click al botón enviar
    // formState es un objeto que proporciona useForm, al ser un OBJETO y no una función, tengo que desestructurarlo y tomar las propiedades que me sirven (en este caso tomo errors que a su vez es un objeto)
    // watch es un OBJETO que va manteniendo los valores de todos los inputs en tiempo real
    // reset me permite resetar los valores de todos los inputs
    return (
        // La propiedad onSubmit es como un 'evento' disparador cuando se envía el formulario, y dispara el handleSubmit (manejador del envío)
        <FormStyled onSubmit={submit}>    
            <Field>
                {/* Nombre */}
                <label htmlFor="name">Nombre</label>
                <input id= "name" type="text" {...register("nombre", {
                    required: {
                        value: true,
                        message: "Se requiere un nombre"
                    },
                    minLength: {
                        value: 2,
                        message: "El nombre debe tener mínimo 2 caracteres"
                    }
                })} />
                {
                    errors.nombre && <span>{errors.nombre.message}</span>
                }
            </Field>
            <Field>
                {/* Correo */}
                <label htmlFor="email">Mail</label>
                <input id= "email" type="email" {...register("email", {
                    required: {
                        value: true,
                        message: "Se requiere un mail"
                    }, 
                    pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-z]{2,4}$/,
                        message: "Formato de mail inválido"
                    }
                })} />
                {
                    errors.email && <span>{errors.email.message}</span>
                }
            </Field>
            <Field>
                {/* Contraseña */}
                <label htmlFor="password">Contraseña</label>
                <input id="password" type="password" {...register("contraseña", {
                    required: {
                        value:true,
                        message: "Es requerida una contraseña"
                    }, 
                    minLength: {
                        value: 8,
                        message: "Debe tener mínimo 8 caracteres"
                    },
                    maxLength: {
                        value: 20,
                        message: "Debe tener como máximo 20 caracteres"
                    }
                })} />
                {
                    errors.contraseña && <span>{errors.contraseña.message}</span>
                }
            </Field>
            <Field>
                {/* Confirmar contraseña */}
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <input id="confirmPassword" type="password" {...register("confirmacionContraseña", {
                    required: {
                        value: true,
                        message: "Se requiere confirmar la contraseña"
                    },
                    validate: (contraseñaConf) => {
                        const contraseña = watch("contraseña")
                        if (contraseñaConf !== contraseña){
                            return "Las contraseñas no coinciden"                            
                        }
                    }
                })}/>
                {
                    errors.confirmacionContraseña && <span>{errors.confirmacionContraseña.message}</span>
                }
            </Field>
            <Field>
                {/* Fecha de nacimientos */}
                <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                <input id="fechaNacimiento" type="date" {...register("fechaNacimiento", {
                    required: {
                        value: true,
                        message: "Se requiere una fecha de nacimiento"
                    },
                    // validate permite realizar validaciones personalizadas
                    validate: (input) => {
                        const fechaNacimiento = new Date(input)
                        const fechaActual = new Date()
                        if (!esMayorEdad(fechaNacimiento,fechaActual)){
                            return "Debe ser mayor a 18 años"
                        }
                    }
                })}/>
                {
                    errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>
                }
            </Field>
            <Field>
                {/* Pais */}
                <label htmlFor="pais">Pais</label>
                <select id="pais" {...register("pais")}>
                    {/* A los optiones le doy valores(value) porque es la forma de guardar el valor
                    cuando los usuarios seleccionan una opción, a diferencia de los inputs que el usuario
                    va cargando los datos, y estos se almacenan sin necesidad de un value */}
                    <option value="ar">Argentina</option>
                    <option value="br">Brasil</option>
                    <option value="ch">Chile</option>
                    <option value="py">Paraguay</option>
                </select>
                {
                    watch("pais") === "ar" && (
                        <input type="text" placeholder="Ingrese una provincia" {...register("provincia",{
                            required: {
                                value: true,
                                message: "Debe ingresar una provincia"
                            }
                        })}></input>
                    )
                }
                {
                    errors.provincia && <span>{errors.provincia.message}</span>
                }
                {
                    watch ("pais") !== "ar" && (
                        <input type="text" placeholder="Ingrese un estado" {...register("estado", {
                            required: {
                                value:true,
                                message: "Debe ingresar un estado"
                            }
                        })}></input>
                    )
                }
                {
                    errors.estado && <span>{errors.estado.message}</span>
                }
                
            </Field>
            <Field>
                {/* Términos y condiciones */}
                <label htmlFor="terminosCondiciones">Términos y condiciones</label>
                <input id="terminosCondiciones" type="checkbox" {...register("terminosCondiciones",{
                    required: true
                })} />
                {
                    errors.terminosCondiciones && <span>Se deben aceptar los términos y condiciones</span>
                }
            </Field>
            <button>Enviar</button>
            <pre style={{width: "400px", color: "white"}}>{JSON.stringify(watch(), null, 2)}</pre>
        </FormStyled>
    )
}
