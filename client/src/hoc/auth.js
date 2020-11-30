import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (ComposedClass, reload, adminRoute) { //=null

    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(async response => {
                if (await !response.payload.isAuth) {
                    if (reload) {
                        alert('Wymagane jest logowanie')
                        props.history.push('/login')
                    }
                } else {
                    if (adminRoute) {
                        if(response.payload.isAdmin){
                            // alert('Witamy, administratorze')
                            props.history.push('/admin')
                        }
                        else{
                            alert('Nie masz uprawnień administratora')
                            props.history.push('/')
                        }    
                        //(adminRoute && !response.payload.isAdmin) {
                        
                        //props.history.push('/')
                    }
                    else {
                        if (reload === false) {
                            props.history.push('/')
                        }
                    }
                }
            })
            
        }, [dispatch, props.history, user.googleAuth])

        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck
}


