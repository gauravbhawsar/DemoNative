import React, { FC, ReactElement, useState } from 'react'
import { StyleSheet, TextInput, Text, View, TouchableOpacity ,Alert} from "react-native"
import { Formik } from 'formik';
import * as Yup from 'yup';
import { loginApi } from "../ApiServices/UserServices"
import { useNavigation } from '@react-navigation/native';
import { FormikForm } from '../component/FormikForm';


export const Login: FC<{}> = ({ }): ReactElement => {
  const navigation = useNavigation();
  const [state, setState] = useState({ email: "", password: "" });
  const submitHandler = async (values: any) => {
    setState({ ...state, email: values.email, password: values.password });
    const data = {
      email: values.email,
      password: values.password
    }
    const response = await loginApi(data);
    if(response?.data?.msg) {
      Alert.alert(response?.data?.msg)
    }
    if(response.data.err==0){
      navigation.navigate('Dashboard',{})
    }
    
  }
  const initialValues={email: '', password: ''}
  const validationSchema=Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Please enter valid email'),
      password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/
      )
      .required(
        'Please enter valid password'
      ),
  })
  return (
    <>
      

      {/* <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values: any) => submitHandler(values)}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required('Please enter valid email'),
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
              <Text style={styles.labalText}>Email</Text>
              <TextInput
                placeholder='email'
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {errors.email && touched.email ? <Text style={[styles.labalText, { color: "red", fontWeight: 'normal' }]}>{errors.email}</Text> : null}
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
              
              <View style={styles.footerWrapper}>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{justifyContent:'flex-end', marginBottom: 10}} 
                  onPress={()=>navigation.navigate('Signup',{})}
                >
                  <Text style={{fontWeight: 'bold', paddingBottom: 2}}>Signup!  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{justifyContent:'flex-end', marginBottom: 10}} 
                  onPress={()=>navigation.navigate('ForgotPassword',{})}
                >
                  <Text style={{fontWeight: 'bold', paddingBottom: 2}}>Forgot password?</Text>
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
        password={true}
        login={true}
      />
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor:'#d5f5f5', 
    alignItems: 'center', 
    justifyContent: 'center',
    width: '100%', 
    minHeight: 40, 
    padding: 5,
  },
  headingText: {
    fontWeight: 'bold', 
    fontSize: 18 ,
  },
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
    backgroundColor: "#d5f5f5",
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: '25%',
    marginVertical: 10,
    marginEnd: 30
  },
  submitButtonText: {
    alignSelf: 'center',
    color: 'white'
  },
  footerWrapper: {
    flexDirection:"row", 
    alignContent: 'center', 
    justifyContent: 'flex-start', 
    width: '65%',
    marginVertical: 8
  }
});