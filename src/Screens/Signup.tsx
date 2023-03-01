//@ts-nocheck
import React, { FC, ReactElement, useState } from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Alert } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { registerApi } from "../ApiServices/UserServices"
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormikForm } from '../component/FormikForm';

export const Signup: FC<{}> = ({ }): ReactElement => {
  const navigation = useNavigation();

  const [state, setState] = useState({ fullName: "", email: "", password: "" });


  const submitHandler = async (values: any) => {
    // setState({...state,fullName:values.fullName,email:values.email,password:values.password});
    const data = {
      name: values.fullName, email: values.email, password: values.password
    }
    const response = await registerApi(data);
    if (response?.data?.msg) {
      Alert.alert(response?.data?.msg)
    }
    if (response.data.err == 0) {
      navigation.navigate('Login')
    }

  }
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Please enter valid email'),
    fullName: Yup.string().required('Please enter full name'),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/
      )
      .required(
        'Please enter valid password'
      ),
  })
  const initialValues = { email: '', password: '', fullName: '' };
  return (
    <>
      {/* <Formik
        initialValues={{ email: '', password: '', fullName: '' }}
        onSubmit={(values: any) => submitHandler(values) }
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required('Please enter valid email'),
          fullName: Yup.string().required('Please enter full name'),
          password: Yup.string()
            .matches(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/
            )
            .required(
              'Please enter valid password'
            ),
        })}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }: any) => (
          <>
            <View style={styles.mainView}>
              <Text style={styles.labalText}>Full Name</Text>
              <TextInput
                placeholder='full name'
                style={styles.input}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
              />
              {errors.fullName && touched.fullName ? <Text style={[styles.labalText, {color:"red",fontWeight:'normal'}]}>{errors.fullName}</Text> : null}
              <Text style={styles.labalText}>Email</Text>
              <TextInput
                placeholder='email'
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && touched.email ? <Text style={[styles.labalText, {color:"red",fontWeight:'normal'}]}>{errors.email}</Text> : null}
              <Text style={styles.labalText}>Password</Text>
              <TextInput
                placeholder='password'
                secureTextEntry={true}
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {errors.password && touched.password ? <Text style={[styles.labalText, {color:"red",fontWeight:'normal'}]}>Please enter valid Password</Text> : null}
              <View style={styles.footerWrapper}>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
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
        name={true}
        password={true}
        signup={true}
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
    marginEnd: 150

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