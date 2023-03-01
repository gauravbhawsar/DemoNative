import React, { FC, ReactElement, useState } from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormikForm } from '../component/FormikForm';
import * as Yup from 'yup';
import { resetPasswordApi } from "../ApiServices/UserServices"
import { useNavigation } from '@react-navigation/native';
export const ResetPassword: FC<{}> = ({ }): ReactElement => {
    const navigation = useNavigation();
    const [state, setState] = useState({ password: "", otp: "" });
    const submitHandler = async (values: any) => {
        setState({ ...state, password: values.password, otp: values.otp });
        const email = await AsyncStorage.getItem('email');
        const data = {
            password: values.password,
            otp: values.otp,
            email,
        }
        const response = await resetPasswordApi(data);
        if (response?.data?.msg) {
            Alert.alert(response?.data?.msg)
        }
        if (response.data.err == 0) {
            navigation.navigate('Login', {})
        }

    }
    const initialValues = { email: '', otp: "" }
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/
            )
            .required(
                'Please enter valid password'
            ),
        otp: Yup.number()
            .required("Please enter valid otp"),
    })
    return (
        <>
            {/* <Formik
                initialValues={{ email: '', otp: "" }}
                onSubmit={(values: any) => submitHandler(values)}
                validationSchema={Yup.object().shape({
                    password: Yup.string()
                        .matches(
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/
                        )
                        .required(
                            'Please enter valid password'
                        ),
                    otp: Yup.number()
                        .required("Please enter valid otp"),
                })}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }: any) => (
                    <>
                        <View style={styles.mainView}>
                            <Text style={styles.labalText}>New Password</Text>
                            <TextInput
                                placeholder='password'
                                secureTextEntry={true}
                                style={styles.input}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                            {errors.password && touched.password ? <Text style={[styles.labalText, { color: "red", fontWeight: 'normal' }]}>Please enter valid Password</Text> : null}
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
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={styles.submitButtonText}>submit</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik> */}
            <FormikForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                submitHandler={submitHandler}
                email={true}
                otp={true}
                resetPassword={true}
            />
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
        width: '25%',
        marginVertical: 10

    },
    submitButtonText: {
        alignSelf: 'center',
        color: 'white'
    }
});