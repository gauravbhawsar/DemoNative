import React, { FC, ReactElement, useState } from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormikForm } from '../component/FormikForm';
import * as Yup from 'yup';
import jwt from 'jwt-decode';
import { forgotPasswordApi, loginApi } from "../ApiServices/UserServices"
import { useNavigation } from '@react-navigation/native';

export const ForgotPassword: FC<{}> = ({ }): ReactElement => {
    const navigation = useNavigation();
    const [state, setState] = useState({ email: "", otp: 0 });
    const submitHandler = async (values: any) => {
        setState({ ...state, email: values.email, otp: values.otp });
        const data = {
            email: values.email,
            otp: values.otp
        }
        const response = await forgotPasswordApi(data);
        if (response?.data?.token) {
            const token = jwt(response?.data?.token);
            console.log(token, "token---------------------------")
            await AsyncStorage.setItem(
                'email', token?.data
            );
        }
        if (response?.data?.msg) {
            Alert.alert(response?.data?.msg)
        }
        if (response.data.err == 0) {
            navigation.navigate('ResetPassword', {})
        }

    }
    const initialValues = { email: ''}
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email()
            .required('Please enter valid email'),
    })
    return (
        <>
            {/* <Formik
        initialValues={{ email: ''}}
        onSubmit={(values: any) => submitHandler(values)}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required('Please enter valid email'),
        })}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }: any) => (
          <>
            <View style={styles.mainView}>
              <Text style={styles.labalText}>Email</Text>
              <TextInput
                placeholder='email'
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && touched.email ? <Text style={[styles.labalText, { color: "red", fontWeight: 'normal' }]}>{errors.email}</Text> : null}
              <View style={styles.footerWrapper}>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{justifyContent:'flex-end', marginBottom: 10}}>
                <Text style={{fontWeight: 'bold', paddingBottom: 2}} onPress={()=>navigation.navigate('Login',{})}>Login</Text>
              </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Formik> */}
            <FormikForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                submitHandler={submitHandler}
                email={true}
                forgotPassword={true}
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
        width: '30%',
        marginVertical: 10,
        marginEnd: 120

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
    }
});