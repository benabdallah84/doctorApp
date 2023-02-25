import React, {useState,useEffect} from 'react'
import { ScrollView, KeyboardAvoidingView,  View, Text } from 'react-native'
//import CheckBox from '@react-native-community/checkbox'
import CheckBox from 'expo-checkbox'
import styles from './styles/authStyles'
import ScreenTitle from '../components/ScreenTitle'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from '../config/axios'
import {SIGNUP_URL} from '../config/urls'
import Loader from '../components/Loader'
import Alert from '../components/Alert'
import * as Location from 'expo-location'

function SignUpScreen(props){
  const [formData, setFormData]= useState({
    name:"",
    email:"",
    password:"",
    specialization:"",
    phone:"",
    address:"",
    workingHours:"",
    userType:false,
    location:null

  })

  const [location, setLocation]= useState(null)
  const [isLoading, setIsLoading]= useState(false)
  const [alert, setAlert]= useState({messages:null,type:''})

  useEffect(()=>{
    (
      async() => {
        let {status} = await Location.requestForegroundPermissionsAsync()
        if(status !== 'granted'){
          return;
        }
        let location = await Location.getCurrentPositionAsync({})
        setLocation(location)
      }
    )()
  },[])

  const changeFormValue = (key, value) =>{
    setFormData({...formData, [key]: value})
  }
  //Hide the alert messages afer 3 s
  useEffect(() => {
    const timer = setTimeout(() =>{
      setAlert({messages:null})
    },3000);
    return () => clearTimeout(timer)
  },[alert.messages])
  //validation function
  const validation =()=>{
    const {name, email, password, specialization, address, workingHours, phone, userType} = formData
    let validationErrors = []
    let passed = true
    if(!name){
      validationErrors.push("الرجاء ادخال الاسم")
      passed = false
    }
    if(!email){
      validationErrors.push("الرجاء ادخال البريد الالكتروني")
      passed = false
    }
    if(!password){
      validationErrors.push("الرجاء ادخال كلمة المرور")
      passed = false
    }
    if(userType){
      if(!specialization){
        validationErrors.push("الرجاء ادخال التخصص")
        passed = false
      }
      if(!address){
        validationErrors.push("الرجاء ادخال العنوان")
        passed = false
      }
      if(!workingHours){
        validationErrors.push("الرجاء ادخال ساعات العمل")
        passed = false
      }
      if(!phone){
        validationErrors.push("الرجاء ادخال رقم الهاتف")
        passed = false
      }
    }
    if(validationErrors.length > 0){
      setAlert({messages: validationErrors, type:'danger'})

    }
    return passed
  }
  const {name, email, password, specialization, address, workingHours, phone, userType} = formData
//sign up function
  const _signUp = () =>{
    if(!validation()) return;
    (
      async() => {
        setIsLoading(true)
        const {name, email, password, specialization, address, workingHours, phone, userType} = formData
        const body ={
          name, 
          email, 
          password, 
          specialization, 
          address, 
          workingHours, 
          phone, 
          userType: userType ? 'doctor' : 'normal',
          location:{
            latitude:location ? location.coords.latitude : null,
            longitude: location ? location.coords.longitude : null
          }

        }
        try{
          
          const response = await axios.post(SIGNUP_URL, body)
          
          setFormData({
            name:"",
            email:"",
            password:"",
            specialization:"",
            phone:"",
            address:"",
            workingHours:"",
            userType:false,
            location:null
          })
          setIsLoading(false)
          props.navigation.navigate('SignIn')
          
        }catch(e){
          setAlert({messages: e.response, type:'danger'})
          setIsLoading(false)
        }
      }
    )()
    
  }
    return (
        <ScrollView contentContainerStyle={{paddingVertical:40}}>
          <Loader title="جاري انشاء حساب جديد" loading={isLoading}/>
          <Alert messages={alert.messages} type={alert.type}/>
         <View style={styles.container}>
           <ScreenTitle title="شاشة تسجيل حساب جديد" icon="md-person-add"></ScreenTitle>

           <KeyboardAvoidingView behavior='padding' enabled>
              <Input placeholder="الاسم" value={name} onChangeText={(text)=> changeFormValue('name',text)}/>
              <Input placeholder="البريد الالكتروني" value={email} onChangeText={(text)=> changeFormValue('email',text)}/>
              <Input  secureTextEntry placeholder="كلمة المرور" value={password} onChangeText={(text)=> changeFormValue('password',text)}/>
              <View style={styles.checkboxContainer}>
              {Platform.OS === 'ios' ? (
                    <CheckBox
                      boxType="square"
                      value={userType}
                      onValueChange={(text)=> changeFormValue('userType',text)}
                    />
                  ) : (
                    <CheckBox value={userType} onValueChange={(text)=> changeFormValue('userType',text)} />
                  )}
                {/* <CheckBox style={styles.checkbox} value={userType} onValueChange={(text)=> changeFormValue('userType',text)}/> */}
                <Text style={styles.checkboxLabel}>طبيب</Text>
              </View>
              {userType && 
                (
                  <React.Fragment>
                    <Input placeholder="التخصص" value={specialization} onChangeText={(text)=> changeFormValue('specialization',text)}/>
                    <Input placeholder="ساعات العمل" value={workingHours} onChangeText={(text)=> changeFormValue('workingHours',text)}/>
                    <Input placeholder="العنوان" value={address} onChangeText={(text)=> changeFormValue('address',text)}/>
                    <Input placeholder="الهاتف" value={phone} onChangeText={(text)=> changeFormValue('phone',text)}/>
                  </React.Fragment>

                )             
              
              }
              
              <Button text="انشاء" onPress={_signUp}/>
           </KeyboardAvoidingView>

         </View>
       </ScrollView>
    );
}
export default SignUpScreen;
