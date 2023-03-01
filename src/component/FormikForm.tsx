import React, { FC, ReactElement, useState } from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Alert } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { registerApi } from "../ApiServices/UserServices"
import { Formik } from 'formik';
import * as Yup from 'yup';

export const FormikForm: FC<{}> = (props): ReactElement => {
    const navigation = useNavigation();
    // console.log(props,"props---------------------")
    //   const [state,setState]=useState({fullName:"",email:"",password:"",otp:""});
    return (
        <>
            <Formik
                initialValues={props.initialValues}
                onSubmit={(values: any) => props.submitHandler(values)}
                validationSchema={props.validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }: any) => (
                    <>
                        <View style={styles.mainView}>
                            {props.name ?
                                <>
                                    <Text style={styles.labalText}>Full Name</Text>
                                    <TextInput
                                        placeholder='full name'
                                        style={styles.input}
                                        onChangeText={handleChange('fullName')}
                                        onBlur={handleBlur('fullName')}
                                        value={values.fullName}
                                    />
                                    {errors.fullName && touched.fullName ? <Text style={[styles.labalText, { color: "red", fontWeight: 'normal' }]}>{errors.fullName}</Text> : null}
                                </> : ""}
                            {props.email ?
                                <>
                                    <Text style={styles.labalText}>Email</Text>
                                    <TextInput
                                        placeholder='email'
                                        style={styles.input}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                    {errors.email && touched.email ? <Text style={[styles.labalText, { color: "red", fontWeight: 'normal' }]}>{errors.email}</Text> : null}
                                </> : ""}
                            {props.password ?
                                <>
                                    <Text style={styles.labalText}>Password</Text>
                                    <TextInput
                                        placeholder='password'
                                        secureTextEntry={true}
                                        style={styles.input}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                    {errors.password && touched.password ? <Text style={[styles.labalText, { color: "red", fontWeight: 'normal' }]}>Please enter valid Password</Text> : null}
                                </> : ""}
                            {props.otp ?
                                <>
                                    <Text style={styles.labalText}>Otp</Text>
                                    <TextInput
                                        keyboardType='numeric'
                                        placeholder='otp'
                                        style={styles.input}
                                        onChangeText={handleChange('otp')}
                                        onBlur={handleBlur('otp')}
                                        value={values.otp}
                                    />
                                    {errors.otp && touched.otp ? <Text style={[styles.labalText, { color: "red", fontWeight: 'normal' }]}>{errors.otp}</Text> : null}
                                </> : ""}
                            {/* <View style={styles.footerWrapper}> */}
                                {props.signup ? <>
                                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                        <Text style={styles.submitButtonText}>Submit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.footerTextWrapper}>
                                        <Text style={styles.footerText} onPress={() => navigation.navigate('Login', {})}>Login?</Text>
                                    </TouchableOpacity>
                                </> : ""}
                                {props.resetPassword ? <>
                                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                        <Text style={styles.submitButtonText}>submit</Text>
                                    </TouchableOpacity>
                                </> : ""}
                                {props.login ? <>
                                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                        <Text style={styles.submitButtonText}>Login</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.footerTextWrapper}
                                        onPress={() => navigation.navigate('Signup', {})}
                                    >
                                        <Text style={styles.footerText}>Signup!  </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.footerTextWrapper}
                                        onPress={() => navigation.navigate('ForgotPassword', {})}
                                    >
                                        <Text style={styles.footerText}>Forgot password?</Text>
                                    </TouchableOpacity>
                                </>:""}
                            {props.forgotPassword ? <>
                                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                    <Text style={styles.submitButtonText}>submit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.footerTextWrapper}>
                                    <Text style={styles.footerText} onPress={() => navigation.navigate('Login', {})}>Login?</Text>
                                </TouchableOpacity>
                            
                                </> : ""}
                    {/* </View> */}
                    </View>
        </>
    )
}
        </Formik >
        </>
    );
}
const styles = StyleSheet.create({
    input: {
        width: '65%',
        height: 40,
        borderRadius: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    labalText: {
        width: "65%",
        alignItems: 'flex-start',
        marginVertical: 5,
        fontWeight: "bold"
    },
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: "#d5f5f5"
    },
    submitButton: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        width: '30%',
        marginVertical: 10,
        alignContent: 'center',
        justifyContent: 'center'
    },
    submitButtonText: {
        alignSelf: 'center',
        color: 'white'
    },
    footerWrapper: {
        flexDirection: "row",
        alignContent: 'center',
        justifyContent: 'flex-start',
        width: '65%',
        marginVertical: 8
    },
    footerTextWrapper: {
        width: '65%',
        alignContent: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    footerText: {
        fontWeight: 'bold',
        alignSelf: 'flex-end', 
        paddingBottom: 2 
    }
});