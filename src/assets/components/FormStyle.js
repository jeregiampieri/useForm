import {styled} from "styled-components"

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    button{
        width: 200px;
        height: 40px;
        font-size: 15px;
        padding: 5px;
        border-radius: 5px;
        background-color: #3a6d9f;
        border: 1px solid black;
        color: white;
        cursor: pointer;
    }
`
export const Field = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 300px;
    margin-bottom: 16px;
    gap: 5px;
    input{
        width: 200px;
        font-size: 15px;
    }
    select{
        width: 200px;
        font-size: 15px;
    }
    span{
        color: #c13939;
        font-size: 14px;
    }
`
